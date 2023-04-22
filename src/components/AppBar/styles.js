const getStyles = ({ drawerOpen, theme }) => ({
  appBar: {
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.up("md")]: {},
  },
  toolBar: { justifyContent: "space-between" },
  logo: {
    fontFamily: "GreatVibesRegular",
    fontWeight: "700",
    cursor: "pointer",
    color:
      theme.palette.mode === "light"
        ? theme.palette.primary.contrastText
        : theme.palette.primary.main,
    fontSize: "1.8rem",
  },
  createdBy: {
    fontSize: "1.6rem",
    fontFamily: "GreatVibesRegular",
    color:
      theme.palette.mode === "light"
        ? theme.palette.primary.contrastText
        : theme.palette.grey[400],
  },
  cart: {
    fontSize: "2.7rem",
    color: theme.palette.primary.white,
  },
  account: {
    fontSize: "3rem",
    color: theme.palette.primary.white,
  },
});

export default getStyles;
