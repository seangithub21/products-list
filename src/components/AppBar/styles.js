const getStyles = ({ drawerOpen, theme }) => ({
  appBar: {
    backgroundColor: theme.palette.primary.white,
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    boxShadow: "none",
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
        ? theme.palette.primary.main
        : theme.palette.primary.main,
    fontSize: "1.8rem",
  },
  createdBy: {
    fontSize: "1.6rem",
    fontFamily: "GreatVibesRegular",
    color:
      theme.palette.mode === "light"
        ? theme.palette.primary.main
        : theme.palette.grey[400],
  },
  compare: {
    fontSize: "2.7rem",
    color: theme.palette.primary.main,
  },
  cart: {
    fontSize: "2.7rem",
    color: theme.palette.primary.main,
    position: "relative",
  },
  cartQuantityContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    borderRadius: "50%",
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "2rem",
    height: "2rem",
  },
  cartQuantity: {
    fontWeight: 700,
    color: theme.palette.primary.white,
  },
  account: {
    fontSize: "3rem",
    color: theme.palette.primary.main,
  },
});

export default getStyles;
