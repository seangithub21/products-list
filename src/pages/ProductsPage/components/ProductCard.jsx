import { observer } from "mobx-react-lite";
import { Box, Tooltip, Typography, useTheme } from "@mui/material";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";

import { cartStore } from "stores";

import Button from "components/common/Button";

import { getProductCardStyles } from "../styles";

const ProductCard = ({ product }) => {
  const theme = useTheme();
  const classes = getProductCardStyles({ theme });

  const { addToCart } = cartStore;

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <Box sx={classes.container}>
      <Box sx={classes.imageContainer}>
        <img src={product.images[0]} alt={product.title} />
        <Box>
          <Typography>{product.title}</Typography>
          <Typography sx={classes.description}>
            Description: {product.description}
          </Typography>
          <Typography>Rating: {product.rating}</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography>Price: ${product.price}</Typography>
        <Tooltip title="Add to cart">
          <Box>
            <Button onClick={() => handleAddToCart(product)} icon>
              <AddShoppingCartOutlinedIcon
                sx={{
                  fontSize: "3rem",
                  color: theme.palette.primary.main,
                }}
              />
            </Button>
          </Box>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default observer(ProductCard);
