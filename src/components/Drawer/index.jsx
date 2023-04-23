import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Drawer as MuiDrawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
  useTheme,
  SwipeableDrawer,
  useMediaQuery,
} from "@mui/material";

import { privatePaths } from "configs/routePaths";
import DrawerHeader from "./DrawerHeader";

import getStyles from "./styles";

const Drawer = ({ open, setDrawerOpen }) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery((theme) =>
    theme.breakpoints.between("sm", "md")
  );
  const theme = useTheme();
  const classes = getStyles({ open, theme });
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuItemClick = (menuItem) => {
    navigate(menuItem.path, { replace: true });
    if (isMobile || isTablet) {
      handleDrawer();
    }
  };

  const handleDrawer = () => {
    setDrawerOpen((state) => !state);
  };

  const drawerContent = () => (
    <List>
      {/* {sideBarMenuList.map((menuItem, index) => (
        <ListItem key={menuItem.title} sx={classes.menuItem}>
          <Tooltip title={menuItem.title} placement="right">
            <ListItemButton
              disableRipple
              selected={isMenuItemActive(menuItem)}
              sx={classes.menuItemButton}
              onClick={() => handleMenuItemClick(menuItem)}
            >
              <ListItemIcon
                sx={{
                  ...classes.menuItemIcon,
                  color: isMenuItemActive(menuItem) && "#fff",
                }}
              >
                {menuItem.icon}
              </ListItemIcon>
              <ListItemText
                primary={menuItem.title}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </Tooltip>
        </ListItem>
      ))} */}
      <ListItem>
        <ListItemButton>
          <ListItemText>Products in the cart</ListItemText>
        </ListItemButton>
      </ListItem>
    </List>
  );

  return (
    <SwipeableDrawer
      anchor={isMobile ? "top" : "right"}
      open={open}
      onClose={handleDrawer}
      onOpen={handleDrawer}
      sx={classes.drawer}
    >
      <DrawerHeader></DrawerHeader>
      {drawerContent()}
    </SwipeableDrawer>
  );
};

export default Drawer;
