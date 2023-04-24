import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
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
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import { ColorModeContext } from "core/App";

import { cartStore } from "stores";

import getStyles from "./styles";

const AppBar = ({ drawerOpen, setDrawerOpen }) => {
  const { cart } = cartStore;

  const isTablet = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const theme = useTheme();
  const classes = getStyles({ drawerOpen, theme, cart });
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
              {!!cart?.length && (
                <Box sx={classes.cartQuantityContainer}>
                  <Typography variant="body2" sx={classes.cartQuantity}>
                    {cart.length}
                  </Typography>
                </Box>
              )}
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

export default observer(AppBar);
