import { Box, Typography, styled } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { ConnectWallet } from "@thirdweb-dev/react";

const Navbar = styled(Box)(()=>({
    height:'50px',
    width:'100%',
    display:'flex',
    padding:'5px',
}))

const MenubarContainer = styled(Box)(()=>({
    position:'absolute',
    top:'50px',
    height:`calc(100% - 50px)`,
    width:'100%',
    overflow:'hidden'
}))

function MenubarLayout() {

  const navigate = useNavigate()
  return (
    <Box sx={{position:'relative', height:'100vh', width:'100%'}}>
        <Navbar>
            <Box sx={{height:'100%',textAlign:'center'}}>
              <Typography variant='h5'>Donor App</Typography>
            </Box>

            <Typography sx={{ mx: 2, color: '#fff'}} variant='h6' onClick={()=>{navigate('/dashboard/donor')}}> Donors</Typography>
            <Typography sx={{ mx: 2, color: '#fff'}} variant='h6' onClick={()=>{navigate('/dashboard/bloodRequest')}}> Blood Request</Typography>
            <Typography sx={{ mx: 2, color: '#fff'}} variant='h6' onClick={()=>{navigate('/dashboard/bloodbank')}}> Blood Bank</Typography>
        <Box sx={{flexGrow:1}}/>
          <ConnectWallet dropdownPosition={{ side: 'bottom', align: 'center'}} />
        </Navbar>
        <MenubarContainer id='MenubarContainer'>
            <Outlet/>
        </MenubarContainer>
    </Box>
  )
}

export default MenubarLayout