import styles from "./AdminDogs.module.css";
import React from "react";
import CardDogs from "../CardDogs/CardDogs";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getDogs } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminDogs() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const navigate = useNavigate();
  const handleEdit = (id) => {
    navigate("/admin/dogs/" + id);
  };
  const handleDelete = async (id) => {
    await axios.delete("/dogs/delete/" + id);
    dispatch(getDogs());
  };
  const handleAddDog = (e) => {
    navigate("/admin/dogs/create");
  };
  const showDogs = allDogs.map((dog, index) => {
    return (
      <div key={index}>
        <CardDogs
          id={dog.id_Dog}
          nameD={dog.nameD}
          sexD={dog.sexD}
          photoD={dog.photoD}
          ageD={dog.ageD}
          sizeD={dog.sizeD}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
    );
  });

  useEffect(() => {
    dispatch(getDogs());
  }, []);

  const userLocal = JSON.parse(window.localStorage.getItem("user"));
  if (!userLocal.isAdminU) {
    return (
      <div>
        <h2>ACCESS DENIED</h2>
      </div>
    );
  }
  return (
    <div>
      <div className={styles.containerButtons}>
        <button
          className={styles.button}
          onClick={() => {
            navigate("/account");
          }}
        >
          Volver
        </button>
        <button className={styles.button} onClick={handleAddDog}>
          Agregar un perro
        </button>
      </div>
      <div className={styles.container}>
        <h2 className={styles.h2}>GESTIONAR PERROS</h2>
        <div className={styles.dogListAdmin}>{showDogs}</div>
      </div>
    </div>
  );
}
