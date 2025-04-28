import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home-v2',
        permanent: true, // ou false si tu veux que ce soit temporaire
      },
    ]
  },
  images: {
    domains: ['lh3.googleusercontent.com'], // pour les images de profil Google
  },
}

export default nextConfig
