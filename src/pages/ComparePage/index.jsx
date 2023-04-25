import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import {
  Box,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

import { compareStore } from "stores";

// import getStyles from "./styles";

const ComparePage = () => {
  const {
    getCategories,
    categoriesList,
    getProductsFromCategory,
    productsFromCategoryList,
    currentCategory,
    addProductToCompareList,
    productsCompareList,
    changeProductInCompareList,
    removeProductFromCompareList,
  } = compareStore;

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeCategory = (event) => {
    getProductsFromCategory(event.target.value);
  };

  const handleAddProduct = (event) => {
    addProductToCompareList(event.target.value);
  };

  const handleDeleteProductFromCompare = (product) => {
    removeProductFromCompareList(product);
  };

  return (
    <Box>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120, mb: "4rem" }}>
        <InputLabel>Category</InputLabel>
        <Select value={currentCategory} onChange={handleChangeCategory}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {categoriesList.map(({ value, label }) => (
            <MenuItem value={value} key={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {!!productsFromCategoryList.length ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: "2rem",
            flex: "1 1 10rem",
          }}
        >
          {!!productsCompareList.length && (
            <Box>
              <Box sx={{ mt: "8rem", mb: "2.6rem" }}>
                <Typography>Parameters</Typography>
              </Box>
              <Box>
                {Object.keys(productsCompareList[0]).map((parameter) => {
                  if (parameter === "thumbnail" || parameter === "images") {
                    return null;
                  }
                  return (
                    <Box key={parameter}>
                      <Typography
                        variant="body2"
                        sx={{
                          m: "1rem auto",
                          fontWeight: 700,
                        }}
                      >
                        {parameter}
                      </Typography>
                      <Divider />
                    </Box>
                  );
                })}
              </Box>
            </Box>
          )}
          {!!productsCompareList.length &&
            productsCompareList.map((product, index) => {
              return (
                <Box key={index}>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel>Product</InputLabel>
                    <Select
                      value={product}
                      onChange={(event) =>
                        changeProductInCompareList(event, index)
                      }
                    >
                      {productsFromCategoryList.map((product) => (
                        <MenuItem value={product} key={product.id}>
                          {product.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Box>
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      style={{
                        width: "100%",
                        height: "5rem",
                        objectFit: "contain",
                      }}
                    />
                    {Object.keys(product).map((parameter, index) => {
                      if (parameter === "thumbnail" || parameter === "images") {
                        return null;
                      }
                      if (parameter === "description") {
                        return (
                          <Box key={index}>
                            <Typography
                              variant="body2"
                              sx={{
                                m: "1rem 0",
                                maxWidth: "10rem",
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {product[parameter]}
                            </Typography>
                            <Divider />
                          </Box>
                        );
                      }
                      if (parameter === "price") {
                        return (
                          <Box key={index}>
                            <Typography
                              variant="body2"
                              sx={{
                                m: "1rem auto",
                              }}
                            >
                              ${product[parameter]}
                            </Typography>
                            <Divider />
                          </Box>
                        );
                      }
                      if (parameter === "discountPercentage") {
                        return (
                          <Box key={index}>
                            <Typography
                              variant="body2"
                              sx={{
                                m: "1rem auto",
                                color: "red",
                              }}
                            >
                              {product[parameter]}%
                            </Typography>
                            <Divider />
                          </Box>
                        );
                      }
                      return (
                        <Box key={index}>
                          <Typography
                            variant="body2"
                            sx={{
                              m: "1rem auto",
                            }}
                          >
                            {product[parameter]}
                          </Typography>
                          <Divider />
                        </Box>
                      );
                    })}
                    <Typography
                      variant="body2"
                      onClick={() => handleDeleteProductFromCompare(product)}
                      sx={{ cursor: "pointer", m: "1rem auto" }}
                    >
                      Remove
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          <Box sx={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel>Product</InputLabel>
              <Select value={""} onChange={handleAddProduct}>
                {productsFromCategoryList.map((product) => (
                  <MenuItem value={product} key={product.id}>
                    {product.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
      ) : (
        <Typography>Nothing to compare.</Typography>
      )}
    </Box>
  );
};

export default observer(ComparePage);
