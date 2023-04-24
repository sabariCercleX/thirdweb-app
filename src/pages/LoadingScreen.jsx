import { Box, CircularProgress, Typography } from '@mui/material'
import React from 'react'

function LoadingScreen() {
  return (
    <Box sx={{ width: '100%', height: '100vh', display: 'flex',flexDirection:'column', justifyContent: 'center', alignItems: 'center' }}>
      <CircularProgress color='primary' sx={{m:2}}/>
      <Typography variant='h6'>Loading ...</Typography>
    </Box>
  )
}

export default LoadingScreen