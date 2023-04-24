import { IconButton, Button as MuiButton } from "@mui/material";

const Button = ({ children, icon, ...props }) => {
  return icon ? (
    <IconButton {...props}>{children}</IconButton>
  ) : (
    <MuiButton {...props}>{children}</MuiButton>
  );
};

export default Button;
