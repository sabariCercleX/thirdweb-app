import { Box } from '@mui/material'
import React from 'react'

function Donor() {
  const [donorList, setDonorList] = useState([])

  const navigate = useNavigate()

  const navigateToDonorCreate = () => {
    navigate('/createDonor')
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
        <Box sx={{width:'100%', height:`50px`, backgroundColor: 'error.main', dislay:'flex', justifyContent:'center', alignItems:'center', alignContent:'center'}}>
            {/* <Typography variant='h5' sx={{color:'primary.contrastText', alignSelf:'center'}}>Blood Donor App</Typography> */}
            <Box sx={{display:'flex', flexDirection:'row', alignItems:'center', height:'100%', mx: 3}}>
            <Typography sx={{ mx: 2, color: '#fff'}} variant='h6' onClick={()=>{navigate('')}}> Donors</Typography>
            <Typography sx={{ mx: 2, color: '#fff'}} variant='h6' onClick={()=>{navigate('/bloodRequest')}}> Blood Request</Typography>
            </Box>
            
        </Box>
       <Box sx={{width:'100%',  display:'flex', p:2 }}>
        <Typography>Donor List</Typography>
        <Box sx={{flexGrow:1}}/>
        <Button variant='contained' onClick={()=>{navigateToDonorCreate()}}>Create New Donor</Button>
      </Box>
      <Box>
      <CustomTable data={donorList} columns={columns} tabColumnName={'deliveryStatus'} actions={tableActions} />
      </Box>
    </Box>
  );
}

export default Donor