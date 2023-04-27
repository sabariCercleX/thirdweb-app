import { Box, styled, TextField, Typography, Button } from '@mui/material'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CustomTable from '../components/CustomTable'

function BloodBank() {
  const [donorList, setDonorList] = useState([])

  const navigate = useNavigate()

  const navigateToDonorCreate = () => {
    navigate('/dashboard/createDonor')
  }

  async function getDonorList(){
    var response = []
    try{
        response = await axios.get('http://localhost:8080/donor/getAllDonor').then(
            (response) => {return response.data}
        )

        setDonorList(response)
        console.log(donorList)
    }catch(error){
        console.log(error)
    }
  }

  useEffect(()=>{
    getDonorList()
  },[])


  const columns = React.useMemo(
    () => [
      {
        accessorKey: 'donorName',
        header: () => 'Donor Name',
        footer: props => props.column.id,
      },
      {
        accessorKey: 'donorAddress',
        header: () => <span>Address</span>,
        footer: props => props.column.id,
      },

      {
        accessorKey: 'donorMobile',
        header: () => 'Mobile No',
        footer: props => props.column.id,
      },

      {
        accessorKey: 'bloodGroup',
        header: () => <span>Blood Group</span>,
        footer: props => props.column.id,
      },
      {
        accessorKey: 'username',
        header: () => <span>Username</span>,
        footer: props => props.column.id,
      },
     
      // {
      //   accessorKey: 'progress',
      //   header: 'Profile Progress',
      //   footer: props => props.column.id,
      //   cell: info => <LinearProgressBar value={Number(info.getValue())} />,
      //   size: 100,
      //   maxSize: 100,
      // },
    ],
    []
  )

  const onView = (id) => {
    console.log(id)
  }

  const onEdit = (id) => {
    console.log(id)
  }

  const tableActions = [
    {
      actionName: 'View',
      onClick: onView,
      icon: 'fa-regular:eye',
      actionDataColumn: 'username'
    },
    {
      actionName: 'Edit',
      onClick: onEdit,
      icon: 'material-symbols:edit',
      actionDataColumn: 'username'
    }
  ]

  return (
    <Box sx={{}}>
       <Box sx={{width:'100%',  display:'flex', p:2 }}>
        <Typography>Blood Bank List</Typography>
        <Box sx={{flexGrow:1}}/>
        <Button variant='contained' onClick={()=>{navigateToDonorCreate()}}>Add Blood Bank</Button>
      </Box>
      <Box>
      <CustomTable data={donorList} columns={columns} tabColumnName={'deliveryStatus'} actions={tableActions} />
      </Box>
    </Box>
  );
}

export default BloodBank