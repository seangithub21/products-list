const getStyles = ({ open, theme } = {}) => ({
  drawer: {
    width: "34rem",
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 4),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  menuItem: {
    display: "block",
    p: "0 .5rem .5rem",
  },
  menuItemButton: {
    minHeight: 48,
    justifyContent: open ? "initial" : "center",
    px: 2.5,
    borderRadius: ".8rem",
    "&.Mui-selected": {
      color: theme.palette.primary.white,
      backgroundColor: theme.palette.primary.main,
      "&:hover": {
        backgroundColor: theme.palette.primary.hover,
      },
    },
  },
  menuItemIcon: {
    minWidth: 0,
    mr: open ? 3 : "auto",
    justifyContent: "center",
    "& svg": {
      fontSize: "1.8rem",
    },
  },
});

export const openedMixin = (theme) => ({
  width: "100%",
  backgroundColor: theme.palette.primary.background,
  border: "none",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  [theme.breakpoints.up("sm")]: {
    width: "34rem",
  },
});

export const closedMixin = (theme) => ({
  backgroundColor: theme.palette.primary.background,
  border: "none",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(38)} + 1px)`,
  },
});

export default getStyles;
