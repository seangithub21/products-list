import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { productsStore, productsByCategoryStore } from "stores";
import ProductCard from "./components/ProductCard";
import Loading from "components/common/Loading";

import getStyles from "./styles";

const ProductsPage = () => {
  const classes = getStyles();
  const navigate = useNavigate();

  const {
    getProducts,
    productsData,
    productsList,
    isLoadingProducts,
    clearStore,
  } = productsStore;
  const { getCategories, categoriesList } = productsByCategoryStore;

  const [hasMore, setHasMore] = useState(
    productsList?.length < productsData?.total || true
  );

  useEffect(() => {
    getProducts();
    getCategories();

    return () => {
      clearStore();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeCategory = (category) => {
    if (category === "") {
      return;
    }
    navigate(`/products-listing/${category}`);
  };

  const fetchMoreData = (productsData, productsList, callback) => {
    callback = callback ? callback : getProducts;

    if (productsList?.length >= productsData?.total) {
      setHasMore(false);
      return;
    }

    const params = { limit: 10, skip: productsList.length };

    callback({
      params,
    });
  };

  return isLoadingProducts ? (
    <Loading />
  ) : (
    <>
      {!!categoriesList.length && (
        <Box>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={""}
              onChange={(event) => handleChangeCategory(event.target.value)}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {categoriesList.map(({ value, label }) => {
                return (
                  <MenuItem value={value} key={value}>
                    {label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
      )}
      <InfiniteScroll
        dataLength={productsList?.length || 1}
        next={() => fetchMoreData(productsData, productsList)}
        hasMore={hasMore}
        loader={<Loading />}
        style={classes.container}
      >
        {productsList?.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </InfiniteScroll>
    </>
  );
};

export default observer(ProductsPage);
