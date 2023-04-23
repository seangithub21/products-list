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
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
    padding: theme.spacing(3),
    borderRadius: theme.spacing(1),
    transition: "all .3s",
    "&:hover": {
      boxShadow:
        "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
    },
  },
  iamgeContainer: {
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
