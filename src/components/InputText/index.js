// InputText Component
// --------------------------------------------------------

import React from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";

const InputText = ({
  id,
  type,
  name,
  value,
  placeholder,
  maxLength,
  onChange,
  disabled,
  variant,
  className,
  iconComponents,
  sx,
}) => {
  return (
    <TextField
      className={className}
      id={id}
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      maxLength={maxLength}
      disabled={disabled}
      onChange={onChange}
      variant={variant}
      sx={{
        margin: "2px 0px",
        borderRadius: "4px",
        "& .MuiInputBase-root": {
          paddingLeft: type === "number" ? "0px" : "8px",
          alignItems: "start",
        },
        "& .MuiInputBase-input": {
          textAlign: type === "number" ? "center" : "",
        },
        "& .MuiOutlinedInput-root": {
          "&:hover fieldset": {
            borderRadius: "4px",
            border: `1px solid ${"#CCCCCC"}`,
          },
          "&.Mui-focused fieldset": {
            borderRadius: "4px",
            border: `1px solid ${"#006A7A"}`,
          },
          "&.Mui-focused input": {
            "&::placeholder": {
              color: "#858585",
            },
          },
        },
        "&.endAndornment": {
          ".MuiOutlinedInput-root": {
            paddingRight: "0px",
          },
        },
        "&.iconLeft": {
          ".MuiInputBase-input": {
            paddingLeft: "8px",
          },
        },
        "&.sm": {
          maxHeight: "36px",
          ".MuiOutlinedInput-root": {
            maxHeight: "36px",
          },
          ".inputAdorment": {
            maxHeight: "36px",
          },
        },
        "&.lg": {
          minHeight: "78px",
          ".MuiOutlinedInput-root": {
            minHeight: "78px",
            alignItems: "flex-start",
          },
          ".inputAdorment": {
            minHeight: "78px",
          },
        },
        ".MuiOutlinedInput-notchedOutline": {
          borderRadius: "4px",
          border: `1px solid ${"#CCCCCC"}`,
          boxShadow: "inset 0px 2px 4px rgba(51, 51, 51, 0.15)",
          legend: {
            width: "inherit !important",
            maxWidth: "inherit !important",
          },
        },
        ".MuiInputBase-input": {
          color: "#333333",
          fontFamily: "Nunito Sans",
          fontSize: "14px",
          fontWeight: "400",
          lineHeight: "24px",
          padding: "8px",
          "&::placeholder": {
            fontFamily: "Nunito Sans",
            fontSize: "14px",
            color: "#858585",
            fontWeight: "400",
            lineHeight: "24px",
          },
        },
        ...sx,
      }}
      InputProps={{
        startAdornment: iconComponents,
      }}
      inputProps={{
        maxLength,
      }}
    />
  );
};

InputText.propTypes = {
  id: PropTypes.string,
  type: PropTypes.oneOf(["text", "number", "textarea"]),
  name: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  maxLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  variant: PropTypes.string,
  iconComponents: PropTypes.node,
  sx: PropTypes.object,
};

InputText.defaultProps = {
  id: "",
  type: "text",
  name: "",
  value: "",
  placeholder: "",
  maxLength: "",
  onChange: () => {},
  disabled: false,
  className: "",
  variant: "outlined",
  iconComponents: "",
  sx: {},
};

export default InputText;
