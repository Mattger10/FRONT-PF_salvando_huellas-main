import styles from "./EditArticle.module.css";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { detailArticle } from "../../redux/actions";
import axios from "axios";
import React from "react";
import { uploadFile } from "../../firebase/config";

export default function EditArticle() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const detail = useSelector((state) => state.detailArticle);
  const [inputData, setInput] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState(null);
  const loader = <div className={styles.customloader}></div>


  const handleEdit = () => {
    navigate(`/admin/articles`);
  };

  const handleEd = (e) => {
    e.preventDefault();
    let response = confirm("¿Está seguro que quiere dejar de editar?");
    if (response === true) {
      handleEdit()
    }
  };


  const handleInput = (e) => {
    setInput({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const result = await uploadFile(file);
      const response = await axios.put("/articles/update/" + Number(id), {
        ...inputData,
        photoA: result,
        activeA: true,
      });
      setLoading(false)
      setMessage("Artículo "+(inputData.nameA || detail.nameA)+" actualizado!");
    } catch (error) {
      setLoading(false)
      setMessage("Error al actualizar artículo")
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(detailArticle(id));
    setInput(detail);
    return setInput({});
  }, [id]);

  useEffect(() => {
    const userLocal = JSON.parse(window.localStorage.getItem("user"));
    if (!userLocal.isAdminU) {
      navigate("/home");
    }
  }, []);
  return (
    <div className={styles.container}>
      <h2 className={styles.h2}>Editar Artículo</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Nombre:
          <input
            className={styles.input}
            type="text"
            value={inputData.nameA || detail.nameA}
            name="nameA"
            onChange={handleInput}
          ></input>
        </label>
        <label className={styles.label}>
          Descripción:
          <textarea
            className={styles.textarea}
            type="text"
            value={inputData.descriptionA || detail.descriptionA}
            name="descriptionA"
            onChange={handleInput}
          ></textarea>
        </label>
        <label className={styles.label}>
          Precio:
          <input
            className={styles.input}
            type="number"
            value={inputData.priceA || detail.priceA}
            name="priceA"
            onChange={handleInput}
          ></input>
        </label>
        <label className={styles.label}>
          Stock disponible:
          <input
            className={styles.input}
            type="number"
            value={inputData.stockA || detail.stockA}
            name="stockA"
            onChange={handleInput}
          ></input>
        </label>
        <label className={styles.label}>
          Subir imagen
          <input
            className={styles.input}
            type="file"
            name=""
            id=""
            onChange={(e) => setFile(e.target.files[0])}
          ></input>
          <img
            className={styles.img}
            src={file ? URL.createObjectURL(file) : detail.photoA}
          />
        </label>
        <div className={styles.containerButton}>
          <button className={styles.button} type="button" onClick={handleEd}>
          Cancelar
        </button>
       
          <button className={styles.button} type="submit">
            APLICAR CAMBIOS
          </button>
         
        </div>
      </form>
      {loading ? <div className={styles.containerMessage}>
          <div className={styles.message}>
            {loader}
          </div>
        </div> : ""}
      {message.length ? (
        <div className={styles.containerMessage}>
          <div className={styles.message}>
            <h3>{message}</h3>
            <Link to="/admin/articles">
            <button
              className={styles.buttonAceptar}
              onClick={() => {
                setMessage("");
              }}
            >
              Aceptar
            </button>
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
