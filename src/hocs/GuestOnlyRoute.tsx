// Next Imports
import { redirect } from 'next/navigation'

// Third-party Imports
import { getServerSession } from 'next-auth'

// Type Imports
import type { ChildrenType } from '@core/types'


// Config Imports


// Util Imports


const GuestOnlyRoute = async ({ children }: ChildrenType ) => {
  const session = await getServerSession()

  if (session) {
    redirect('/home')
  }

  return <>{children}</>
}

export default GuestOnlyRoute
