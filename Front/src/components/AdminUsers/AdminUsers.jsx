import React, { useEffect, useState } from "react";
import styles from "./AdminUsers.module.css";
import { getUsers } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CardUser from "../CardUser/CardUser";
import axios from "axios";

export default function AdminUsers() {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.users);
  const navigate = useNavigate();
  const [searchName, setSearchName] = useState("")

  const banUser = (id)=>{
    axios.put('/users/ban/'+id)
    .then(res => dispatch(getUsers()))
  }
  const unbanUser = (id)=>{
    axios.put('/users/unban/'+id)
    .then(res => dispatch(getUsers()))
  }

  const handleSearchName = (e)=>{
    setSearchName(e.target.value)
  }

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
          banUser={banUser}
          unbanUser={unbanUser}
        />
      )})
    : "";

  return (
    <div>
      <Link to={"/account"}>
        <button type="button">Volver</button>
      </Link>
      <h2>Gestionar Usuarios</h2>
      <input type='search' onChange={handleSearchName} value={searchName} placeholder='Buscar por nombre...'></input>
      <div>{showUsers}</div>
    </div>
  );
}
