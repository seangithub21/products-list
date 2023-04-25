import { Box, useTheme } from "@mui/material";

import getStyles from "./styles";

const DrawerHeader = ({ sx, children }) => {
  const theme = useTheme();
  const classes = getStyles({ theme });

  return <Box sx={{ ...classes.drawerHeader, ...sx }}>{children}</Box>;
};

export default DrawerHeader;
