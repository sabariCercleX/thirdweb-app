import { BorderStyle } from "@mui/icons-material";
import { alpha, InputBase, styled, Table, TableCell, TableHead, TableRow } from "@mui/material";

export const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderStyle:'solid',
    borderWidth:1,
    borderRadius: theme.shape.borderRadius,
    borderColor: alpha(theme.palette.text.disabled,0.75),
    backgroundColor: theme.palette.background.paper,
    '&:hover': {
      backgroundColor: alpha(theme.palette.background.paper,0.80),
      borderColor: theme.palette.primary.main,
    },
    '&:active': {
      borderColor: theme.palette.primary.main,
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const LIST_PADDING = 1;

  export const StyledTableHeadRow = styled(TableRow)(({theme})=>({
    color: theme.palette.primary.main,
    textTransform:'uppercase'
  }))
  
  export const StyledTableRow = styled(TableRow)(({theme})=>({
    backgroundColor: theme.palette.background.paper,
    borderStyle: 'solid',
    borderColor:theme.palette.primary.main,
    '&:first-of-type':{
      borderRadius: `10px 0 0 10px`
    },
    '&:last-child':{
      borderRadius: `0 10px 10px 0`
    }
  }))

  export const StyledTableCell = styled(TableCell)(({theme})=>({
    padding: 12,
    textAlign: 'center',
    verticalAlign: 'middle',
    '&:first-of-type':{
      borderRadius: `10px 0 0 10px`
    },
    '&:last-child':{
      borderRadius: `0 10px 10px 0`
    }
  }))

  export const StyledTableView = styled(Table)(({theme})=>({
    borderSpacing:`0 10px`,
    borderCollapse: 'separate',
  }))
  
  export const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));