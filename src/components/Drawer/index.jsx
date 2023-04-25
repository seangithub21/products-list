import { observer } from "mobx-react-lite";
import {
  List,
  ListItem,
  Tooltip,
  Typography,
  useTheme,
  SwipeableDrawer,
  useMediaQuery,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

import { cartStore } from "stores";
import DrawerHeader from "./DrawerHeader";
import Button from "components/common/Button";

import getStyles from "./styles";

const Drawer = ({ open, setDrawerOpen }) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery((theme) =>
    theme.breakpoints.between("sm", "md")
  );
  const theme = useTheme();
  const classes = getStyles({ open, theme });

  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
    cartStore;

  const handleDrawer = () => {
    setDrawerOpen((state) => !state);
  };

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  const handleIncreaseQuantity = (productId) => {
    increaseQuantity(productId);
  };

  const handleDecreaseQuantity = (productId) => {
    decreaseQuantity(productId);
  };

  const drawerContent = () => (
    <Box sx={{ padding: "2rem" }}>
      <List sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {!!cart.length ? (
          cart.map((product) => {
            return (
              <ListItem
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "stretch",
                  borderBottom: `1px solid ${theme.palette.grey[400]}`,
                  gap: "1rem",
                  padding: ".5rem 1rem",
                }}
                key={product.id}
              >
                <Box
                  sx={{
                    "& img": {
                      width: "8rem",
                      height: "8rem",
                      objectFit: "contain",
                    },
                  }}
                >
                  <img src={product?.images?.[0]} alt={product.title} />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        whiteSpace: "pre-line",
                      }}
                    >
                      {product.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: theme.palette.primary.main }}
                    >
                      ${product.price}
                    </Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "2rem" }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Button
                        icon
                        onClick={() => handleDecreaseQuantity(product.id)}
                      >
                        <RemoveOutlinedIcon sx={{ fontSize: "1.2rem" }} />
                      </Button>
                      <Typography variant="body2">
                        {product.quantity}
                      </Typography>
                      <Button
                        icon
                        onClick={() => handleIncreaseQuantity(product.id)}
                      >
                        <AddOutlinedIcon sx={{ fontSize: "1.2rem" }} />
                      </Button>
                    </Box>
                    <Box
                      onClick={() => handleRemoveFromCart(product.id)}
                      sx={{
                        fontSize: "1.2rem",
                        fontWeight: 400,
                        textTransform: "none",
                        color: "red",
                        cursor: "pointer",
                      }}
                    >
                      remove
                    </Box>
                  </Box>
                </Box>
              </ListItem>
            );
          })
        ) : (
          <Typography>No products in the cart.</Typography>
        )}
      </List>
      {!!cart.length && (
        <Button
          sx={{ mt: "2rem", mb: "2rem", borderRadius: 0 }}
          variant="contained"
          fullWidth
        >
          Checkout
        </Button>
      )}
    </Box>
  );

  return (
    <SwipeableDrawer
      anchor={isMobile ? "top" : "right"}
      open={open}
      onClose={handleDrawer}
      onOpen={handleDrawer}
      sx={classes.drawer}
    >
      <DrawerHeader
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 2rem",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Cart
        </Typography>
        <Button icon onClick={handleDrawer}>
          <CloseIcon sx={{ fontSize: "2rem" }} />
        </Button>
      </DrawerHeader>
      {drawerContent()}
    </SwipeableDrawer>
  );
};

export default observer(Drawer);
