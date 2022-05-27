import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function _modelWithButton({
  children,
  buttonColor,
  buttonIcon,
  buttonText,
  setOpen,
  open = false,
  width = 600,
  disabled = false,
}) {
  const dispatch = useDispatch();
  const handleChange = () => {
    dispatch(setOpen(!open));
  };

  return (
    <Box>
      <Button
        variant="contained"
        size="small"
        color={buttonColor}
        startIcon={buttonIcon}
        onClick={handleChange}
        disabled={disabled}
      >
        {buttonText}
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: width,
            bgcolor: (theme) => theme.palette.background.paper,
            boxShadow: 24,
            p: 3,
          }}
        >
          {children}
        </Box>
      </Modal>
    </Box>
  );
}
