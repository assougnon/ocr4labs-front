import { getServerSession } from 'next-auth'

import { authOptions } from '@/libs/auth'
import Avatar from '@mui/material/Avatar'

export default async function Page() {
  const session = await getServerSession(authOptions)

  console.log('SESSION', session)

  return <div>Session: {JSON.stringify(session)}
  
  </div>
}
