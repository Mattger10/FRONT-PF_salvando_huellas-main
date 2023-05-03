import styles from "./EditDog.module.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editDog } from "../../redux/actions";
import axios from "axios";
import React from "react";
import { uploadFile } from "../../firebase/config";

export default function EditDog() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const dog = useSelector((state) => state.editDog);
  const [inputData, setInput] = useState({});
  const [message, setMessage] = useState("");
  const [selectedRefs, setSelectedRefs] = useState([]);
  const [references, setReferences] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false)
  const loader = <div className={styles.customloader}></div>

  const handleInput = (e) => {
    setInput({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = () => {
    navigate(`/dogs/${id}`);
  };

  const handleEd = (e) => {
    e.preventDefault();
    let response = confirm("¿Está seguro que quiere dejar de editar?");
    if (response === true) {
      handleEdit()
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const result = await uploadFile(file);
      const response = await axios.put("/dogs/update/" + Number(id), {
        ...inputData,
        photoD: result,
        references: selectedRefs,
      });
      setLoading(false)
      setMessage("Datos de "+(inputData.nameD || dog.nameD)+" actualizados!");
    } catch (error) {
      setLoading(false)
      setMessage("Error al actualizar datos")
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(editDog(id));
    setInput(dog);
    return setInput({});
  }, [id]);

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
      <h2 style={{ fontFamily: "Lemon Days" }} className={styles.h2}>Editar Perros</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Nombre:
          <input
            className={styles.input}
            type="text"
            value={inputData.nameD || dog.nameD}
            name="nameD"
            onChange={handleInput}
          ></input>
        </label>
        <label className={styles.label}>
          Sexo:
          <select
            className={styles.input}
            value={inputData.sexD || dog.sexD}
            name="sexD"
            onChange={handleInput}
          >
            <option value={"male"}>Macho</option>
            <option value={"female"}>Hembra</option>
          </select>
        </label>
        <label className={styles.label}>
          Tamaño:
          <select
            className={styles.input}
            value={inputData.sizeD || dog.sizeD}
            name="sizeD"
            onChange={handleInput}
          >
            <option value={"Small"}>Pequeño</option>
            <option value={"Medium"}>Mediano</option>
            <option value={"Large"}>Grande</option>
          </select>
        </label>

        <label className={styles.label}>
          Edad:
          <select
            className={styles.input}
            value={inputData.ageD || dog.ageD}
            name="ageD"
            onChange={handleInput}
          >
            <option value={"Puppy"}>Cachorro</option>
            <option value={"Adult"}>Adulto</option>
            <option value={"Old"}>Viejito</option>
          </select>
        </label>
        <label className={styles.label}>
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
          Historia:
          <textarea
            className={styles.textarea}
            type="text"
            value={inputData.historyD || dog.historyD}
            name="historyD"
            onChange={handleInput}
          ></textarea>
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
            src={file ? URL.createObjectURL(file) : dog.photoD}
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
            <Link to="/admin/dogs">
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
