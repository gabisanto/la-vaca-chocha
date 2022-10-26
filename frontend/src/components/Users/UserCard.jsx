import React from "react";
import DeleteUser from "./DeleteUser";
import EditAdmin from "./EditAdmin";
import { useSelector } from "react-redux";
import "./userStyles.css";

const UserCard = ({ userDetail, stateChanger, users }) => {
  const admin = useSelector((state) => state.user);
  return (
    <div className="usersMain">
      <img
        className="usersImage"
        src={
          userDetail.isAdmin
            ? "https://i.imgur.com/XoblkGo.png"
            : "https://i.imgur.com/VMTIsmD.png"
        }
        alt={userDetail.name}
      />
      <div>
        <p className="usersName">{userDetail.name}</p>
        <p className="usersRole">
          {userDetail.isAdmin ? "Administrador" : "Usuario"}
        </p>
      </div>

      {userDetail.email !== admin.email && (
        <>
          <DeleteUser
            user={userDetail}
            users={users}
            stateChanger={stateChanger}
          />
          <EditAdmin
            user={userDetail}
            users={users}
            stateChanger={stateChanger}
          />
        </>
      )}
    </div>
  );
};

export default UserCard;
