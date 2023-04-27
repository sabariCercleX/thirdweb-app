import PropTypes from "prop-types";
// icons
import { Icon } from "@iconify/react";

// @mui
import { Box } from "@mui/material";

// ----------------------------------------------------------------------



export default function Iconify({ id, icon,  onClick, ...other }) {
  return <Box id={id} component={Icon} onClick={()=>{onClick && onClick()}} icon={icon} {...other} />;
}
