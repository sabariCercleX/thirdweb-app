import { Box, styled } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
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
  return (
    <Box sx={{position:'relative', height:'100vh', width:'100%'}}>
        <Navbar>
            
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