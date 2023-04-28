import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { uploadFile } from "../../firebase/config";
import styles from "./PostForms.module.css";

const FormularioPost = () => {
  const [inputData, setInput] = useState({
    titleP: "",
    commentP: "",
    category: "",
    photoP: "",
  });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleInput = (e) => {
    setInput({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await uploadFile(file);
      const response = await axios.post("/posts/register", {
        ...inputData,
        photoP: result,
      });
      setMessage(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {}, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.h2}>CREA TU PUBLICACIÓN</h2>
    <form className={styles.form} onSubmit={handleSubmit}>
      <div>
        <label className={styles.label} htmlFor="titleP">
          Título:
          <input className={styles.input} type="text" name="titleP" onChange={handleInput} />
        </label>
      </div>
      <div>
        <label className={styles.label} htmlFor="commentP">
          Comentario:
          <textarea className={styles.textarea} name="commentP" onChange={handleInput}></textarea>
        </label>
      </div>
      <div>
        <label className={styles.label} htmlFor="category">
          Categoría:
          <select className={styles.input} type="text" name="category" onChange={handleInput} >
            <option value="Tienda">Tienda</option>
            <option value="Adopcioón">Adopción</option>
            <option value="Donación">Donación</option>
          </select>
        </label>
        <div>
          <label className={styles.label}>
            Imagen:
            <input className={styles.input}
              type="file"
              name="photoP"
              onChange={(e) => setFile(e.target.files[0])}
            />
              {file ? (  <img className={styles.img}
            src={file ? URL.createObjectURL(file) : ""}  
          /> ) : null}

          </label>
        </div>
      </div>
      <button className={styles.button} type="submit">Publicar</button>
    </form>
    {message.length ? (
        <div className={styles.containerMessage}>
          <div className={styles.message}>
            <h3>{message}</h3>
            
            <button
              className={styles.button}
              onClick={() => {
                setMessage("");
                navigate("/posts");
              }}
            >
              Aceptar
            </button>
          </div>
        </div>
      ) : null}
    </div>
    
  );
};

export default FormularioPost;
