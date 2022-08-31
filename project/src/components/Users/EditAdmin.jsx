import { useState } from "react";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import AlertMessage from "../../commons/AlertMessage";
import ConfirmDialog from "../../commons/ConfirmDialog";

const EditAdmin = ({ user, users, stateChanger }) => {
  /* status del mensaje de delete */
  const [editStatus, setEditStatus] = useState("");

  const handleEdit = (userToEdit) => {
    let data = { isAdmin: !userToEdit.isAdmin };
    axios
      .put(`http://localhost:3001/api/users/${userToEdit.id}`, data)
      .then((res) => {
        setEditStatus("success");
        let newUsers = users.filter((user) => user.id !== userToEdit.id);
        stateChanger([...newUsers, res.data].sort((a, b) => a.id - b.id));
        setTimeout(() => {
          setEditStatus("");
        }, 3000);
      })
      .catch(() => {
        setEditStatus("error");
        setTimeout(() => {
          setEditStatus("");
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
        <EditIcon />
      </IconButton>
      {openDialog && (
        <ConfirmDialog
          title={"¿Desea editar este usuario?"}
          message={
            "Esta acción modificará los permisos del usuario. Proceda con precaución"
          }
          handleDelete={handleEdit}
          opacity={1}
          item={user}
          openDialog={openDialog}
          stateChanger={setOpenDialog}
        />
      )}
      {editStatus && (
        <AlertMessage
          type={editStatus}
          message={
            editStatus === "success"
              ? `Usuario editado correctamente`
              : `Hubo algún problema`
          }
        />
      )}
    </div>
  );
};

export default EditAdmin;
