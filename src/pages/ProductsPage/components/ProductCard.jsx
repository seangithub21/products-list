import { Box, Tooltip, Typography, useTheme } from "@mui/material";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";

import Button from "components/common/Button";

import { getProductCardStyles } from "../styles";

const ProductCard = ({ product }) => {
  const theme = useTheme();
  const classes = getProductCardStyles({ theme });

  const handleAddToCart = () => {};

  return (
    <Box sx={classes.container}>
      <Box sx={classes.iamgeContainer}>
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
        <Tooltip>
          <>
            <Button onClick={handleAddToCart}>
              <AddShoppingCartOutlinedIcon
                sx={{
                  fontSize: "3rem",
                  color: theme.palette.primary.accent,
                }}
              />
            </Button>
          </>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default ProductCard;
