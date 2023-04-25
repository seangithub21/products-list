const getStyles = () => ({
  container: {
    maxWidth: "100%",
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
  },
});

export const getProductCardStyles = ({ theme }) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flex: "1 1 33rem",
    boxShadow: "rgba(0, 0, 0, 0.05) 0rem .1rem .2rem 0rem",
    padding: theme.spacing(3),
    transition: "all .3s",
    "&:hover": {
      boxShadow: "rgba(17, 17, 26, 0.1) 0px 1px 0px;",
    },
  },
  imageContainer: {
    "& img": {
      width: "100%",
      height: "30rem",
      objectFit: "contain",
      mb: theme.spacing(3),
    },
  },
  description: {
    wordWrap: "break-word",
    overflow: "hidden",
    maxHeight: "4.8rem",
    lineHeight: "2.4rem",
  },
});

export default getStyles;
