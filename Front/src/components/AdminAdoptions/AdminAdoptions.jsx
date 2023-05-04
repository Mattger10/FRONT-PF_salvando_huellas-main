import React, {useEffect} from "react";
import styles from "./AdminAdoptions.module.css";
import { getAdoptions } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CardAdoption from "../CardAdoption/CardAdoption";
import axios from "axios";

export default function AdminAdoptions() {
  const dispatch = useDispatch();
  const allAdoptions = useSelector((state) => state.adoptions);
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getAdoptions());
  }, []);

  const changeStatus = async (status, id) => {
    await axios
      .put("/adoptions/update/" + id, { status })
      .catch((error) => console.error(error.message));
    dispatch(getAdoptions());
  };
  useEffect(() => {
    const userLocal = JSON.parse(window.localStorage.getItem("user"));
    if (!userLocal || !userLocal.isAdminU) {
      navigate("/home");
    }
  }, []);
  return (
    <div className={styles.container}>
      <Link to={"/account"}>
        <button className={styles.button} type="button">
          Volver
        </button>
      </Link>
      <h2 className={styles.h2}>Gestionar Solicitudes de Adopción</h2>
      <div>
        {allAdoptions.map((adop, index) => (
          <CardAdoption
            key={index}
            changeStatus={changeStatus}
            adoption={adop}
          />
        ))}
      </div>
    </div>
  );
}
