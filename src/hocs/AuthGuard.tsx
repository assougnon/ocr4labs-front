import { getServerSession } from 'next-auth'
import AuthRedirect from '@/components/AuthRedirect'
import type { ChildrenType } from '@core/types'

export default async function AuthGuard({ children }: ChildrenType) {
  const session = await getServerSession()

  if (!session) return <AuthRedirect />

  return <>{children}</>
}
