// MUI Imports
import Grid from '@mui/material/Grid2'

// Component Imports
import Page from './details/page'


const Account = () => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <Page />
      </Grid>

    </Grid>
  )
}

export default Account
