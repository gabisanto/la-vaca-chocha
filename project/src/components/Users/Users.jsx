import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Banner from "../../commons/Banner/Banner";
import UserCard from "./UserCard";
import "./userStyles.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/users")
      .then((res) => res.data)
      .then((data) => {
        setUsers(data.sort((a, b) => a.id - b.id));
      });
  }, []);

  if (users.length === 0) return "Cargando";

  return (
    <div style={{ backgroundColor: "#e0e0e0", paddingBottom: 60 }}>
      <Banner
        text={"Usuarios"}
        image={
          "http://culturacientifica.com/app/uploads/2017/06/Cows_grazing_autumn_morning_Somerset_levels_2930581997.jpg"
        }
      />
      <div className="usersContainer">
        {users.map((user) => (
          <UserCard
            key={user.id}
            userDetail={user}
            users={users}
            stateChanger={setUsers}
          />
        ))}
      </div>
    </div>
  );
};

export default Users;
