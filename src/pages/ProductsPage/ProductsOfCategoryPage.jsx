import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from "react-router-dom";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { productsByCategoryStore } from "stores";
import Loading from "components/common/Loading";
import ProductCard from "./components/ProductCard";

import getStyles from "./styles";

const ProductsOfCategoryPage = () => {
  const classes = getStyles();
  const navigate = useNavigate();
  const { category } = useParams();

  const {
    getCategories,
    categoriesList,
    currentCategory,
    getProductsOfCategory,
    productsByCategoryList,
    productsByCategoryData,
    isLoadingProducts,
    isLoadingCategories,
  } = productsByCategoryStore;

  const [hasMore, setHasMore] = useState(
    productsByCategoryList?.length < productsByCategoryData?.total || true
  );

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getProductsOfCategory({ category });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const handleChangeCategory = (category) => {
    if (category === "") {
      navigate("/");
    }
    navigate(`/products-listing/${category}`);
  };

  const fetchMoreData = (productsData, productsList, callback) => {
    callback = callback ? callback : getProductsOfCategory;

    if (productsList?.length >= productsData?.total) {
      setHasMore(false);
      return;
    }

    const params = { limit: 10, skip: productsList.length };

    callback({
      params,
    });
  };

  return (
    <Box>
      {!!categoriesList.length && (
        <Box>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={currentCategory}
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
      <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
      {isLoadingProducts || isLoadingCategories ? (
        <Loading />
      ) : (
        <InfiniteScroll
          dataLength={productsByCategoryList?.length || 1}
          next={() =>
            fetchMoreData(productsByCategoryData, productsByCategoryList)
          }
          hasMore={hasMore}
          loader={<Loading />}
          style={classes.container}
        >
          {productsByCategoryList?.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </InfiniteScroll>
      )}
    </Box>
  );
};

export default observer(ProductsOfCategoryPage);
