import { React, useState } from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import AlertMessage from "../../commons/AlertMessage";
import ConfirmDialog from "../../commons/ConfirmDialog";
const DeleteUser = ({ user, users, stateChanger }) => {
  /* status del mensaje de delete */
  const [deleteStatus, setDeleteStatus] = useState("");

  const handleDelete = (userToDelete) => {
    axios
      .delete(`http://localhost:3001/api/users/${userToDelete.id}`)
      .then(() => {
        setDeleteStatus("success");
        let newUsers = users.filter((user) => user.id !== userToDelete.id);
        stateChanger(newUsers.sort((a, b) => a.id - b.id));
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
    <div>
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
          title={"¿Desea eliminar este usuario?"}
          message={"Esta acción es irreversible."}
          handleDelete={handleDelete}
          opacity={1}
          item={user}
          openDialog={openDialog}
          stateChanger={setOpenDialog}
        />
      )}
      {deleteStatus && (
        <AlertMessage
          type={deleteStatus}
          message={
            deleteStatus === "success"
              ? `Usuario borrado correctamente`
              : `Hubo algún problema`
          }
        />
      )}
    </div>
  );
};

export default DeleteUser;
