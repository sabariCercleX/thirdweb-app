

import { Box, styled, TextField, Typography, Button } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack';
import { useContract, useContractWrite } from "@thirdweb-dev/react";


function CreateRequest() {
  const [donorDetails, setDonorDetails] = useState({userName:'', bloodType:'',userAddress:'',mobile:'', latitude:'', longitude:'', walletaddress:''})

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const navigate = useNavigate()

  const navigateToRegister = () => {
    navigate('/register')
  }

  // async function createDonor(){
  //   try{
  //       var response = await axios.post('http://localhost:8080/donor/create', donorDetails).then((res)=>{return res.data})
  //       enqueueSnackbar('Donor Created Successfully')
  //   }catch(error){
  //       console.log(error)
  //   }
  // }

  const { contract } = useContract("0xE0c0C73992B208e74254A46f15368a21025cD5fb");
  const { mutateAsync: registerDonor, isLoading } = useContractWrite(contract, "registerDonor")

  const call = async () => {
    try {
      const data = await registerDonor({ args: [userName, bloodType, userAddress, mobile, latitude, longitude, walletaddress] });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  }

  return (
    <Box sx={{ display: 'flex',width:`100%`, height:`100vh`}}>
       <Box sx={{ flex: 1,width:'100%', height:'100%', backgroundColor:'primary.main' }}>
      </Box>
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center',width:'100%', height:'100%', backgroundColor:'background.default' }}>
        <Box sx={{display:'flex', flexDirection:'column',backgroundColor:'background.paper', p:4, justifyContent:'center'}}>
          <Typography variant='h4' SX={{}}>Blood Donor</Typography>
          <Box sx={{display:'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', m:2}}>
            <TextField size='small' label={'Username'} value={donorDetails.username} onChange={(event)=>{setDonorDetails({...donorDetails,username:event.target.value})}} sx={{my:1}}/>
            <TextField size='small' label={'Donor Name'} value={donorDetails.donorName} onChange={(event)=>{setDonorDetails({...donorDetails,donorName:event.target.value})}} sx={{my:1}}/>
            <TextField size='small' label={'Donor Address'} value={donorDetails.donorAddress} onChange={(event)=>{setDonorDetails({...donorDetails,donorAddress:event.target.value})}} sx={{my:1}}/>
            <TextField size='small' label={'Mobile No'} value={donorDetails.donorMobile} onChange={(event)=>{setDonorDetails({...donorDetails,donorMobile:event.target.value})}} sx={{my:1}}/>
            <TextField size='small' label={'Blood Group'} value={donorDetails.bloodGroup} onChange={(event)=>{setDonorDetails({...donorDetails,bloodGroup:event.target.value})}} sx={{my:1}}/>
            
            <Button variant='contained' onClick={()=>{createDonor()}} sx={{width:'100%', my:1}}>Create Request</Button>
          </Box>
        </Box>

      </Box>  

    </Box>
  );
}

export default CreateRequest