import { Box, styled, TextField, Typography, Button } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack';
import { useContract, useContractWrite } from "@thirdweb-dev/react";

function CreateBloodBank() {
  const [donorDetails, setDonorDetails] = useState({userName:'', bloodType:'',userAddress:'',mobile:'', latitude:'111111111', longitude:'111111111', walletaddress:'0x0323E5606eBA43287F9fd8f4a14c76Bc736C1CD6'})

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const navigate = useNavigate()

  const navigateToRegister = () => {
    navigate('/register')
  }
 
  const { contract } = useContract("0xE0c0C73992B208e74254A46f15368a21025cD5fb");
  const { mutateAsync: registerBloodBank, isLoading } = useContractWrite(contract, "registerBloodBank")

  const call = async () => {
    try {
      const data = await registerBloodBank({ args: [donorDetails.userName, donorDetails.userAddress, donorDetails.mobile, donorDetails.latitude, donorDetails.longitude, donorDetails.walletaddress] });
      console.info("contract call successs", data);
      enqueueSnackbar("Donor Created Successfully",{variant:'success'})
    } catch (err) {
      console.error("contract call failure", err);
      enqueueSnackbar("Error Occured " + err,{variant:'error'})
    }
  }


  return (
    <Box sx={{ display: 'flex',width:`100%`, height:`100vh`}}>
       <Box sx={{ flex: 1,width:'100%', height:'100%', backgroundColor:'primary.main' }}>
      </Box>
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center',width:'100%', height:'100%', backgroundColor:'background.default' }}>
        <Box sx={{display:'flex', flexDirection:'column',backgroundColor:'background.paper', p:4, justifyContent:'center'}}>
          <Typography variant='h4' SX={{}}>Blood Bank</Typography>
          <Box sx={{display:'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', m:2}}>
            <TextField size='small' label={'Blood Bank Name'} value={donorDetails.userName} onChange={(event)=>{setDonorDetails({...donorDetails,userName:event.target.value})}} sx={{my:1}}/>
            <TextField size='small' label={'Blood Bank Address'} value={donorDetails.userAddress} onChange={(event)=>{setDonorDetails({...donorDetails,userAddress:event.target.value})}} sx={{my:1}}/>
            <TextField size='small' label={'Mobile No'} value={donorDetails.mobile} onChange={(event)=>{setDonorDetails({...donorDetails,mobile:event.target.value})}} sx={{my:1}}/>
            
            <LoadingButton loading={isLoading} variant='contained' onClick={call} sx={{width:'100%', my:1}}>Add Blood Bank</LoadingButton>
          </Box>
        </Box>

      </Box>  

    </Box>
  );
}

export default CreateBloodBank