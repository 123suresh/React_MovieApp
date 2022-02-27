import { Button } from "@mui/material";
import React from "react";

function CommonButton({
  type,
  buttonName,
  onClick,
  size,
  color,
  disabled,
  fullWidth,
}) {
  return (
    <div>
      <Button
        variant="contained"
        type={type}
        onClick={onClick}
        size={size}
        color={color}
        disabled={disabled}
        fullWidth={fullWidth}
      >
        {buttonName}
      </Button>
    </div>
  );
}

export default CommonButton;
