import { NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'  // ajuste si nécessaire selon ton chemin
import { getServerSession } from 'next-auth'
import { authOptions } from '@/libs/auth' // ajuste selon où tu définis ton authOptions

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const userId = session.user.id

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    // Supprimer le mot de passe du retour (par sécurité)
    const { password: _, ...filteredUser } = user

    return NextResponse.json(filteredUser)
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
