import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog({
  openDialog,
  stateChanger,
  handleDelete,
  item,
  title,
  message,
  opacity,
}) {
  const [open, setOpen] = React.useState(openDialog);

  const handleClose = () => {
    setOpen(false);
    stateChanger(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ opacity: opacity }}
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={(e) => {
              e.preventDefault();
              handleClose();
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              handleDelete(item);
              handleClose();
            }}
            autoFocus
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
