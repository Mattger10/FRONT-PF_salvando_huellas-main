import "./EditArticle.modules.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { detailArticle } from "../../redux/actions";
import axios from "axios";

// RESOLVER PROBLEMA DE ASINCRONISMO CON EL REDUCER
export default function EditArticle() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const detail = useSelector((state) => state.detailArticle);
  const [inputData, setInput] = useState({
    nameA: detail.nameA,
    photoA: detail.photoA,
    descriptionA: detail.descriptionA,
    stockA: detail.stockA,
    priceA: detail.priceA,
  });
  const handleInput = (e) => {
    setInput({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:3001/articles/" + id,
        inputData
      );
      console.log(response.data); // <-- Poner esta respuesta en un cartel
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(detailArticle(id));
    setInput(detail);
  }, [id]);
  return (
    <div>
      <h2>Editar Artículo</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            value={inputData.nameA}
            name="nameA"
            onChange={handleInput}
          ></input>
        </label>
        <label>
          Descripción:
          <input
            type="text"
            value={inputData.descriptionA}
            name="descriptionA"
            onChange={handleInput}
          ></input>
        </label>
        <label>
          Precio:
          <input
            type="number"
            value={inputData.priceA}
            name="priceA"
            onChange={handleInput}
          ></input>
        </label>
        <label>
          Stock disponible:
          <input
            type="number"
            value={inputData.stockA}
            name="stockA"
            onChange={handleInput}
          ></input>
        </label>
        <label>
          Imagen URL:
          <input
            type="url"
            value={inputData.photoA}
            name="photoA"
            onChange={handleInput}
          ></input>
        </label>
        <img src={inputData.photoA}></img>
        <button type="submit">APLICAR CAMBIOS</button>
      </form>
    </div>
  );
}
