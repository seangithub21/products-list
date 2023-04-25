import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import {
  AppBar as MuiAppBar,
  Box,
  Toolbar,
  Tooltip,
  useTheme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import BalanceIcon from "@mui/icons-material/Balance";

import { ColorModeContext } from "core/App";

import { cartStore, cart } from "stores";
import routePaths from "configs/routePaths";
import Button from "components/common/Button";

import getStyles from "./styles";

const AppBar = ({ drawerOpen, setDrawerOpen }) => {
  const { cart } = cartStore;

  const isTablet = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const theme = useTheme();
  const classes = getStyles({ drawerOpen, theme });
  const { toggleColorMode } = useContext(ColorModeContext);
  const navigate = useNavigate();

  const { updateCart } = cartStore;

  useEffect(() => {
    if (localStorage.getItem("cart")) {
      updateCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDrawer = () => {
    setDrawerOpen((state) => !state);
  };

  const handleClickLogo = () => {
    navigate("/", { replace: true });
  };

  const handleClickCompare = () => {
    navigate(`${routePaths.compare}`, { replace: true });
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
          <Tooltip title="Compare">
            <>
              <Button icon onClick={handleClickCompare} sx={{ mr: "1rem" }}>
                <BalanceIcon sx={classes.compare} />
              </Button>
            </>
          </Tooltip>
          <Tooltip title="Open cart">
            <>
              <Button icon onClick={handleDrawer} sx={{ mr: "1rem" }}>
                <ShoppingCartOutlinedIcon sx={classes.cart} />
                {!!cart?.length && (
                  <Box sx={classes.cartQuantityContainer}>
                    <Typography variant="body2" sx={classes.cartQuantity}>
                      {cart.length}
                    </Typography>
                  </Box>
                )}
              </Button>
            </>
          </Tooltip>
          <Tooltip title="Account">
            <>
              <Button icon>
                <PersonOutlineIcon sx={classes.account} />
              </Button>
            </>
          </Tooltip>
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
};

export default observer(AppBar);
