import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import type { NextAuthOptions } from 'next-auth'

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as { email: string; password: string }

        try {
          const res = await fetch(`${process.env.API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          })

          const data = await res.json()

          if (!res.ok) throw new Error(data.message || 'Authentication failed')

          // Normalisation de la réponse
          return {
            id: data.user?.id || data.id,
            name: data.user?.name || data.name,
            email: data.user?.email || data.email,
            image: sanitizeImageUrl(data.user?.image || data.image) || null
          }
        } catch (error) {
          console.error('Authentication error:', error)
          throw new Error('Authentication failed')
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name || `${profile.given_name} ${profile.family_name}`,
          email: profile.email,
          image: profile.picture // Google utilise 'picture' au lieu de 'image'
        }
      }
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: '/login',
    error: '/login?error=1',
  },
  callbacks: {
    async jwt({ token, user }) {
      // Fusion des données plutôt que remplacement
      if (user) {
        token = {
          ...token,
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image || token.image // Garde l'ancienne image si non fournie
        }
      }

      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user = {
          ...session.user,
          id: token.id as string,
          name: token.name as string,
          email: token.email as string,
          image: sanitizeImageUrl(token.image as string) || null
        }
      }


      return session
    },
    async redirect({ url, baseUrl, account }) {
      if (account?.provider === 'google') {
        return `${baseUrl}/home`
      }

      if (url === `${baseUrl}/login` || url === baseUrl) {
        return `${baseUrl}/home`
      }


return url.startsWith(baseUrl) ? url : baseUrl
    },
  },
  debug: process.env.NODE_ENV === 'development',
}

// Fonction helper pour valider les URLs d'image
function sanitizeImageUrl(url: string | null | undefined): string | null {
  if (!url) return null

  try {
    const parsedUrl = new URL(url)

    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') return null

return url
  } catch {
    return null
  }
}
