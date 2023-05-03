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
  const [searchName, setSearchName] = useState("");
  const [searchingUsers, setSearchingUsers] = useState([]);

  const banUser = async (id) => {
    await axios
      .put("/users/ban/" + id)
      .then((res) => dispatch(getUsers()))
      .catch((error) => console.log("ERROR: ", error.message));
    if (searchName.length) {
      await axios
        .get("/users/?data=" + searchName)
        .then((res) => res.data)
        .then((foundUsers) => setSearchingUsers(foundUsers))
        .catch((error) => console.log("ERROR: ", error.message));
    }
  };
  const unbanUser = async (id) => {
    await axios
      .put("/users/unban/" + id)
      .then((res) => dispatch(getUsers()))
      .catch((error) => console.log("ERROR: ", error.message));
    if (searchName.length) {
      await axios
        .get("/users/?data=" + searchName)
        .then((res) => res.data)
        .then((foundUsers) => setSearchingUsers(foundUsers))
        .catch((error) => console.log("ERROR: ", error.message));
    }
  };

  const handleSearchName = (e) => {
    setSearchName(e.target.value);
    if (e.target.value.length) {
      axios
        .get("/users/?data=" + e.target.value)
        .then((res) => res.data)
        .then((foundUsers) => setSearchingUsers(foundUsers))
        .catch((error) => console.log("ERROR: ", error.message));
    }
  };

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
       
        );
      })
    : "";

  const showSearchUsers = searchingUsers.length
    ? searchingUsers.map((user, index) => {
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
        
        );
      })
    : "";

  return (
    <div>
      <Link to={"/account"}>
        <button className={styles.button} type="button">
          Volver
        </button>
      </Link>
      <h2 className={styles.h2}>Gestionar Usuarios</h2>
      <input
        className={styles.input}
        type="search"
        onChange={handleSearchName}
        value={searchName}
        placeholder="Buscar nombre, apellido, email, DNI..."
      ></input>
      <div>{searchName.length ? showSearchUsers : showUsers}</div>
      <span>
        {searchName.length && !showSearchUsers.length
          ? "No se encontró " + searchName
          : ""}
      </span>
    </div>
  );
}
