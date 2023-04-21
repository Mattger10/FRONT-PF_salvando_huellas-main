import "./CreateDogForm.modules.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CreateDog() {
  const navigate = useNavigate()
  const [inputData, setInput] = useState({
    nameD: "",
    historyD: "",
    sexD: "male",
    sizeD: "small",
    photoD: "",
    ageD: "puppy"
  });
  const [message, setMessage] = useState("")

  const handleInput = (e) => {
    setInput({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/dogs/register", inputData);
      setMessage(response.data)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {

  }, []);
  return (
    <div>
      <button onClick={()=>{navigate('/admin/dogs')}}>Volver</button>
      <h2>Añade un perro al refugio</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            value={inputData.nameD}
            name="nameD"
            onChange={handleInput}
            placeholder="Ingresa un nombre..."
          ></input>
        </label>
        <label>
          Historia:
          <textarea
            type="text"
            value={inputData.historyD}
            name="historyD"
            onChange={handleInput}
            placeholder="Escribe su historia..."
          ></textarea>
        </label>
        <label>
          Sexo:
          <select
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
        <label>
          Tamaño:
          <select
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
        <label>
          Edad:
          <select
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
        <label>
          Imagen URL:
          <input
            type="url"
            value={inputData.photoD}
            name="photoD"
            onChange={handleInput}
            placeholder="Pega aquí la URL..."
          ></input>
        </label>
        <img src={inputData.photoD}></img>
        <button type="submit">Añadir Perro</button>
      </form>
      <div className={message.length ? "message" : "hide"}>
        <h3>{message}</h3>
        <button onClick={()=>{setMessage("")}}>Aceptar</button>
      </div>
    </div>
  );
}
