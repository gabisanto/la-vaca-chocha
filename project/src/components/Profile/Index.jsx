import React from "react";
import { useSelector } from "react-redux";
import UserProfile from "./UserProfile";
import AdminProfile from "./AdminProfile";

const Index = () => {
  const user = useSelector((state) => state.user);
  console.log(user);
  return user.isAdmin ? (
    <AdminProfile user={user} />
  ) : (
    <UserProfile user={user} />
  );
};

export default Index;
