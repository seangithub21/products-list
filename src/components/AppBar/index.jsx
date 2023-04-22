import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar as MuiAppBar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  useTheme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import { ColorModeContext } from "core/App";

import getStyles from "./styles";

const AppBar = ({ drawerOpen, setDrawerOpen }) => {
  const isTablet = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const theme = useTheme();
  const classes = getStyles({ drawerOpen, theme });
  const { toggleColorMode } = useContext(ColorModeContext);
  const navigate = useNavigate();

  const handleDrawer = () => {
    setDrawerOpen((state) => !state);
  };

  const handleClickLogo = () => {
    navigate("/", { replace: true });
  };

  return (
    <MuiAppBar position="fixed" sx={classes.appBar}>
      <Toolbar sx={classes.toolBar}>
        <Box sx={{ textAlign: "center" }}>
          <Typography sx={classes.logo} onClick={handleClickLogo}>
            Fancy Logo
          </Typography>
          <Typography sx={classes.createdBy}>By FAM</Typography>
        </Box>
        <Box>
          <Tooltip title="Open cart">
            <IconButton onClick={handleDrawer} sx={{ mr: "1rem" }}>
              <ShoppingCartOutlinedIcon sx={classes.cart} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Account">
            <IconButton>
              <PersonOutlineIcon sx={classes.account} />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
