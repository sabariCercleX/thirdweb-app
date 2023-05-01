import { Box, styled, TextField, Typography, Button } from '@mui/material'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CustomTable from '../components/CustomTable'
import { useContract, useContractRead } from "@thirdweb-dev/react";

function Donor() {
  const [donorList, setDonorList] = useState([])

  const navigate = useNavigate()

  const navigateToDonorCreate = () => {
    navigate('/dashboard/createDonor')
  }

  const { contract } = useContract("0xE0c0C73992B208e74254A46f15368a21025cD5fb");
  const { data, isLoading } = useContractRead(contract, "getDonor", [0, 10])


  useEffect(()=>{
    console.log(data)
  },[])


  const columns = React.useMemo(
    () => [
      {
        accessorKey: 'name',
        header: () => 'Donor Name',
        footer: props => props.column.id,
      },
      {
        accessorKey: 'userAddress',
        header: () => <span>Address</span>,
        footer: props => props.column.id,
      },

      {
        accessorKey: 'mobile',
        header: () => 'Mobile No',
        footer: props => props.column.id,
      },

      {
        accessorKey: 'bloodType',
        header: () => <span>Blood Group</span>,
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
      actionDataColumn: 'donorId'
    },
    {
      actionName: 'Edit',
      onClick: onEdit,
      icon: 'material-symbols:edit',
      actionDataColumn: 'donorIds'
    }
  ]

  return (
    <Box sx={{}}>
       <Box sx={{width:'100%',  display:'flex', p:2 }}>
        <Typography>Donor List</Typography>
        <Box sx={{flexGrow:1}}/>
        <Button variant='contained' onClick={()=>{navigateToDonorCreate()}}>Create New Donor</Button>
      </Box>
      <Box>
      { !isLoading && data && <CustomTable data={data} columns={columns} tabColumnName={'deliveryStatus'} actions={tableActions} />}
      </Box>
    </Box>
  );
}

export default Donor