import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import AlertMessage from "../../commons/AlertMessage";
import ConfirmDialog from "../../commons/ConfirmDialog";
import { deleteCategory } from "../../store/categories";
import { useDispatch } from "react-redux";

const DeleteActions = ({ cat }) => {
  const dispatch = useDispatch();
  /* status del mensaje de delete */
  const [deleteStatus, setDeleteStatus] = useState("");

  const handleDelete = (category) => {
    dispatch(deleteCategory(category))
      .then(() => {
        setDeleteStatus("success");
        setTimeout(() => {
          setDeleteStatus("");
        }, 3000);
      })
      .catch(() => {
        setDeleteStatus("error");
        setTimeout(() => {
          setDeleteStatus("");
        }, 3000);
      });
  };

  /* pop up de confirmación */

  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <IconButton
        onClick={(e) => {
          e.preventDefault();

          setOpenDialog(true);
        }}
      >
        <DeleteIcon />
      </IconButton>
      {openDialog && (
        <ConfirmDialog
          title={"¿Desea eliminar esta categoría?"}
          message={"Esta acción es irreversible."}
          handleDelete={handleDelete}
          opacity={1}
          item={cat}
          openDialog={openDialog}
          stateChanger={setOpenDialog}
        />
      )}
      {deleteStatus && (
        <AlertMessage
          type={deleteStatus}
          message={
            deleteStatus === "success"
              ? `Producto borrado correctamente`
              : `Hubo algún problema`
          }
        />
      )}
    </>
  );
};

export default DeleteActions;
