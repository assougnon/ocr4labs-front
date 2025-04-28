import { NextResponse } from 'next/server'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { prisma } from '@/libs/prisma' // <-- Corrigé ici

const loginSchema = z.object({
  email: z.string().email('Invalid email format').min(1, 'Email is required'),
  password: z.string().min(5, 'Password must be at least 5 characters long')
})

export async function POST(req: Request) {
  const { email, password } = await req.json()

  const validation = loginSchema.safeParse({ email, password })

  if (!validation.success) {
    const errorMessages = validation.error.errors.map(err => err.message)
    return NextResponse.json({ message: errorMessages }, { status: 400 })
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json({ message: ['Email or Password is invalid'] }, { status: 401 })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect) {
      return NextResponse.json({ message: ['Email or Password is invalid'] }, { status: 401 })
    }

    const { password: _, ...filteredUserData } = user

    return NextResponse.json(filteredUserData)
  } catch (err) {
    console.error('Error authenticating user:', err)
    return NextResponse.json({ message: ['Internal Server Error'] }, { status: 500 })
  }
}
