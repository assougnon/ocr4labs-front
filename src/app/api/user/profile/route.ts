import { NextResponse } from 'next/server'

import { getServerSession } from 'next-auth'

import { authOptions } from '@/libs/auth'
import { prisma } from '@/libs/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const userId = session.user.id

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      name: true,
      firstName: true,
      lastName: true,
      email: true,
      image: true,
      birthDate: true,
      phone: true,
      gender: true,
      emergencyContact: true,
      address: true,
      bloodType: true,
      status: true,
      roles: true
    }
  })

  return NextResponse.json(user)
}
