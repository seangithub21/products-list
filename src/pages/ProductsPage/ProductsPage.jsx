import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Box, CircularProgress, Typography } from "@mui/material";

import { productsStore } from "stores";
import ProductCard from "./components/ProductCard";

import getStyles from "./styles";

const ProductsPage = () => {
  const classes = getStyles();
  const { getProducts, products, isLoadingProducts } = productsStore;

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isLoadingProducts ? (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress />
    </Box>
  ) : (
    <Box sx={classes.container}>
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </Box>
  );
};

export default observer(ProductsPage);
