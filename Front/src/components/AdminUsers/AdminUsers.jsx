import React, { useEffect } from "react";
import styles from "./AdminUsers.module.css";
import { getUsers } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CardUser from "../CardUser/CardUser";

export default function AdminUsers() {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.users);
  const navigate = useNavigate();

  useEffect(() => {
    const userLocal = JSON.parse(window.localStorage.getItem("user"));
    if (!userLocal.isAdminU) {
      navigate("/home");
      
    }
  }, []);
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  const showUsers = allUsers.length
    ? allUsers.map((user, index) => {
        return (
        <CardUser
          key={index}
          id={user.id_User}
          name={user.nameU}
          lastName={user.lastNameU}
          dni={user.idNumbU}
          email={user.emailU}
          phone={user.phoneU}
          address={user.addressU}
          isBan={user.is_ban}
          isAdmin={user.isAdminU}
          reason={user.reasonU}
        />
      )})
    : "";

  return (
    <div>
      <Link to={"/account"}>
        <button type="button">Volver</button>
      </Link>
      <h2>Gestionar Usuarios</h2>
      <div>{showUsers}</div>
    </div>
  );
}
