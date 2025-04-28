'use client'

import { usePathname, useSearchParams, redirect } from 'next/navigation'

const AuthRedirect = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const isLoginPage = pathname === '/login'

  // Ne pas rediriger si déjà sur /login ou /register ou /forgot-password, etc.
  const publicPages = ['/login', '/register', '/forgot-password']

  if (publicPages.includes(pathname)) return null

  const currentPath = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`

  return redirect(`/login?redirectTo=${encodeURIComponent(currentPath)}`)
}

export default AuthRedirect
