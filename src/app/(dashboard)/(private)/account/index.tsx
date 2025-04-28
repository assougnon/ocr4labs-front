// MUI Imports
import Grid from '@mui/material/Grid2'

// Component Imports
import Page from './details/page'
import AccountDelete from './AccountDelete'

const Account = () => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <Page />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <AccountDelete />
      </Grid>
    </Grid>
  )
}

export default Account
