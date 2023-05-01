import styles from "./CreateDogForm.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import { uploadFile } from "../../firebase/config";

export default function CreateDog() {
  const navigate = useNavigate();
  const [inputData, setInput] = useState({
    nameD: "",
    historyD: "",
    sexD: "male",
    sizeD: "small",
    photoD: "",
    ageD: "puppy",
  });
  const [selectedRefs, setSelectedRefs] = useState([]);
  const [references, setReferences] = useState([]);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false)
  const loader = <div className={styles.customloader}></div>

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
      const response = await axios.post("/dogs/register", {
        ...inputData,
        photoD: result,
        references: selectedRefs,
      });
      setLoading(false)
      setMessage("Perro "+inputData.nameD+" añadido correctamente!");
    } catch (error) {
      setLoading(false)
      setMessage("Error al añadir el perro")
      console.error(error);
    }
  };

  const getRefers = async () => {
    const response = await axios.get("/references");
    const { allReferences } = response.data;
    const result = allReferences.map((ref) => ref.textR);
    setReferences(result);
  };
  useEffect(() => {
    getRefers();
  }, []);

  const handleReferencesSelect = (e) => {
    if (e.target.value !== "") {
      setSelectedRefs([...selectedRefs, e.target.value]);
      setReferences(references.filter((ref) => ref !== e.target.value));
    }
  };
  const handleReferencesRemove = (e) => {
    setReferences([...references, e.target.value]);
    setSelectedRefs([...selectedRefs].filter((ref) => ref !== e.target.value));
  };

  useEffect(() => {
    const userLocal = JSON.parse(window.localStorage.getItem("user"));
    if (!userLocal.isAdminU) {
      navigate("/home");
      
    }
  }, []);
  return (
    <div className={styles.container}>
      <h2 className={styles.h2}>AÑADE UN PERRO AL REFUGIO</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Nombre:
          <input
            className={styles.input}
            type="text"
            value={inputData.nameD}
            name="nameD"
            onChange={handleInput}
            placeholder="Ingresa un nombre..."
          ></input>
        </label>
        <label className={styles.label}>
          Sexo:
          <select
            className={styles.input}
            type="text"
            value={inputData.sexD}
            name="sexD"
            onChange={handleInput}
            placeholder="Selecciona su sexo..."
          >
            <option value={"male"}>Macho</option>
            <option value={"female"}>Hembra</option>
          </select>
        </label>
        <label className={styles.label}>
          Tamaño:
          <select
            className={styles.input}
            type="text"
            value={inputData.sizeD}
            name="sizeD"
            onChange={handleInput}
            placeholder="Selecciona el tamaño"
          >
            <option value={"small"}>Pequeño</option>
            <option value={"medium"}>Mediano</option>
            <option value={"large"}>Grande</option>
          </select>
        </label>
        <label className={styles.label}>
          Edad:
          <select
            className={styles.input}
            type="text"
            value={inputData.ageD}
            name="ageD"
            onChange={handleInput}
            placeholder="Selecciona edad"
          >
            <option value={"adult"}>Cachorro</option>
            <option value={"puppy"}>Adulto</option>
          </select>
        </label>
        <label className={styles.label}>
          Historia:
          <textarea
            className={styles.textarea}
            type="text"
            value={inputData.historyD}
            name="historyD"
            onChange={handleInput}
            placeholder="Escribe su historia..."
          ></textarea>
        </label>
        <label>
          Referencias:
          <select
            className={styles.input}
            onChange={handleReferencesSelect}
            value={""}
          >
            <option value="">Elegir</option>
            {references.map((ref, index) => (
              <option key={index}>{ref}</option>
            ))}
          </select>
          {selectedRefs.map((ref, index) => (
            <button
              type="button"
              key={index}
              value={ref}
              onClick={handleReferencesRemove}
            >
              {ref}
            </button>
          ))}
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
            src={file ? URL.createObjectURL(file) : ""}
          />
        </label>

        <div className={styles.containerButton}>
          <button
            className={styles.button}
            onClick={() => {
              navigate("/admin/dogs");
            }}
          >
            VOLVER
          </button>
          <button className={styles.button} type="submit">
            AÑADIR PERRO
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
            <button
              className={styles.button}
              onClick={() => {
                setMessage("");
              }}
            >
              Aceptar
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
