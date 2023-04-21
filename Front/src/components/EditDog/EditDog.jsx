import "./EditArticle.modules.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { detailArticle } from "../../redux/actions";
import axios from "axios";

// RESOLVER PROBLEMA DE ASINCRONISMO CON EL REDUCER
export default function EditArticle() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const detail = useSelector((state) => state.detailArticle);
  const [inputData, setInput] = useState({});
  const [message, setMessage] = useState("");

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
        "/articles/update/" + id,
        inputData
      );
      setMessage(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(detailArticle(id));
    setInput(detail);
    return setInput({});
  }, [id]);
  return (
    <div>
      <button
        onClick={() => {
          navigate("/admin/articles");
        }}
      >
        Volver
      </button>
      <h2>Editar Artículo</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            value={inputData.nameA || detail.nameA}
            name="nameA"
            onChange={handleInput}
          ></input>
        </label>
        <label>
          Descripción:
          <textarea
            type="text"
            value={inputData.descriptionA || detail.descriptionA}
            name="descriptionA"
            onChange={handleInput}
          ></textarea>
        </label>
        <label>
          Precio:
          <input
            type="number"
            value={inputData.priceA || detail.priceA}
            name="priceA"
            onChange={handleInput}
          ></input>
        </label>
        <label>
          Stock disponible:
          <input
            type="number"
            value={inputData.stockA || detail.stockA}
            name="stockA"
            onChange={handleInput}
          ></input>
        </label>
        <label>
          Imagen URL:
          <input
            type="url"
            value={inputData.photoA || detail.photoA}
            name="photoA"
            onChange={handleInput}
          ></input>
        </label>
        <img src={inputData.photoA || detail.photoA}></img>
        <button type="submit">APLICAR CAMBIOS</button>
      </form>
      <div className={message.length ? "message" : "hide"}>
        <h3>{message}</h3>
        <button
          onClick={() => {
            setMessage("");
          }}
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}
