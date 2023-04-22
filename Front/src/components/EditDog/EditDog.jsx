import "./EditDog.modules.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editDog } from "../../redux/actions";
import axios from "axios";
import React from 'react';

export default function EditDog () {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const dog = useSelector((state) => state.editDog);
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
        "/dogs/update/" + Number(id),
        inputData
      );
      setMessage(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(editDog(id));
    setInput(dog);
    return setInput({});
  }, [id]);
  return (
    <div>
      <button
        onClick={() => {
          navigate("/admin/dogs");
        }}
      >
        Volver
      </button>
      <h2>Editar Perros</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            value={inputData.nameD || dog.nameD}
            name="nameD"
            onChange={handleInput}
          ></input>
        </label>
        <label>
          Historia:
          <textarea
            type="text"
            value={inputData.historyD || dog.historyD}
            name="historyD"
            onChange={handleInput}
          ></textarea>
        </label>
        <label>
          Sexo:
          <select
            value={inputData.sexD || dog.sexD}
            name="sexD"
            onChange={handleInput}
          >
            <option value={"male"}>Macho</option>
            <option value={"female"}>Hembra</option>
          </select>
        </label>
        <label>
          Tamaño:
          <select
            value={inputData.sizeD || dog.sizeD}
            name="sizeD"
            onChange={handleInput}
          >
            <option value={"Small"}>Pequeño</option>
            <option value={"Medium"}>Mediano</option>
            <option value={"Large"}>Grande</option>
          </select>
        </label>
        
        <label>
        Edad:
        <select
        value={inputData.ageD || dog.ageD}
        name="ageD"
        onChange={handleInput}
        >
        <option value={"Puppy"}>Cachorro</option>
        <option value={"Adult"}>Adulto</option>
        <option value={"Old"}>Viejito</option>
        </select>
        </label>
        <label>
          Imagen URL:
          <input
            type="url"
            value={inputData.photoD || dog.photoD}
            name="photoD"
            onChange={handleInput}
          ></input>
        </label>
        <img src={inputData.photoA || dog.photoA}></img>
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
