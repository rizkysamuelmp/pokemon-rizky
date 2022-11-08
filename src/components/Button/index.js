// Button Component
// --------------------------------------------------------

import React from "react";
import PropTypes from "prop-types";
import ButtonMUI from "@mui/material/Button";

const Button = ({
  type,
  variant,
  onClick,
  disabled,
  children,
  sx,
  startIcon,
  className,
}) => {
  return (
    <ButtonMUI
      type={type}
      onClick={onClick}
      variant="outlined"
      disabled={disabled}
      disableElevation
      sx={{ textTransform: "unset" }}
      style={{ ...sx }}
      startIcon={startIcon}
      className={`${
        variant === "contained"
          ? "bg-green text-white border-blue-dark hover:shadow-lg shadow-md"
          : variant === "outlined"
          ? " bg-white-dark text-blue-dark border-gray hover:shadow-lg shadow-custom"
          : "bg-white text-blue-dark border-0 py-0 px-1 h-6 rounded-md"
      } font-medium font-rubik whitespace-nowrap ${className}`}
    >
      {children}
    </ButtonMUI>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  variant: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  sx: PropTypes.object,
  startIcon: PropTypes.node,
  className: PropTypes.string,
};

Button.defaultProps = {
  type: "button",
  variant: "contained",
  onClick: () => {},
  disabled: false,
  children: "",
  sx: {},
  startIcon: "",
  className: "",
};

export default Button;
