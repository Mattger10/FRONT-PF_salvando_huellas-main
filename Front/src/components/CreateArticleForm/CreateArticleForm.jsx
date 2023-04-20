import "./CreateArticleForm.modules.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CreateArticle() {

  const navigate = useNavigate()
  const [inputData, setInput] = useState({
    nameA: "",
    descriptionA: "",
    stockA: "",
    photoA: "",
    priceA: ""
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
      const response = await axios.post("http://localhost:3001/articles/create/", inputData);
      setMessage(response.data)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {

  }, []);
  return (
    <div>
      <button onClick={()=>{navigate('/admin/articles')}}>Volver</button>
      <h2>Crear artículo en la tienda</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            value={inputData.nameA}
            name="nameA"
            onChange={handleInput}
            placeholder="Ingresa un nombre..."
          ></input>
        </label>
        <label>
          Descripción:
          <textarea
            type="text"
            value={inputData.descriptionA}
            name="descriptionA"
            onChange={handleInput}
            placeholder="Ingresa una descripción..."
          ></textarea>
        </label>
        <label>
          Precio:
          <input
            type="number"
            value={inputData.priceA}
            name="priceA"
            onChange={handleInput}
            placeholder="Ingresa un precio..."
          ></input>
        </label>
        <label>
          Stock disponible:
          <input
            type="number"
            value={inputData.stockA}
            name="stockA"
            onChange={handleInput}
            placeholder="Ingresa el stock..."
          ></input>
        </label>
        <label>
          Imagen URL:
          <input
            type="url"
            value={inputData.photoA}
            name="photoA"
            onChange={handleInput}
            placeholder="Pega aquí la URL..."
          ></input>
        </label>
        <img src={inputData.photoA}></img>
        <button type="submit">AÑADIR ARTÍCULO</button>
      </form>
      <div className={message.length ? "message" : "hide"}>
        <h3>{message}</h3>
        <button onClick={()=>{setMessage("")}}>Aceptar</button>
      </div>
    </div>
  );
}
