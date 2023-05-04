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
  const userLocal = JSON.parse(window.localStorage.getItem("user"))
  const [loading, setLoading] = useState(false)
  const loader = <div className={styles.customloader}></div>
  const [isLogged, setIsLogged] = useState(true);


  
  const handleInput = (e) => {
    setInput({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const result = await uploadFile(file);
      const response = await axios.post("/posts/register", {
        ...inputData,
        photoP: result,
        userId: userLocal.id_User
      });
      setLoading(false)
      setMessage("Post creado con éxito!");
    } catch (error) {
      console.error(error);
      setLoading(false)
      setMessage("Error al publicar el post")
    }
  };

  useEffect(() => {
    if (!userLocal.nameU){
      setIsLogged(false)
    }
  }, []);

  return (
    (isLogged ? <div className={styles.container}>
      <h2 style={{ fontFamily: "Lemon Days" }} className={styles.h2}>CREA TU PUBLICACIÓN</h2>
    <form className={styles.form} onSubmit={handleSubmit}>
      <div>
        <label className={styles.label} htmlFor="titleP">
          Título:
          <input className={styles.input} type="text" name="titleP" onChange={handleInput} required/>
        </label>
      </div>
      <div>
        <label className={styles.label} htmlFor="commentP">
          Comentario:
          <textarea className={styles.textarea} name="commentP" onChange={handleInput} required></textarea>
        </label>
      </div>
      <div>
        <label className={styles.label} htmlFor="category">
          Categoría:
          <select className={styles.input} type="text" name="category" onChange={handleInput} required>
            <option hidden value="">Elegir</option>
            <option value="Tienda">Tienda</option>
            <option value="Adopción">Adopción</option>
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
              required
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
      {loading ? <div className={styles.containerMessage}>
          <div className={styles.message}>
            {loader}
          </div>
        </div> : ""}
    </div> : (
      <div className={styles.containerObligatorio}>
        <h2 className={styles.titleObligatorio}>Oops!</h2>
        <h3 className={styles.subtitleObligatorio}>
          Necesitas iniciar sesión para crear una publicación
        </h3>
        <button
          className={styles.buttonObligatorio}
          onClick={() => {
            navigate("/");
          }}
        >
          Iniciar Sesión
        </button>
      </div>
    ))
    
    
  );
};

export default FormularioPost;
