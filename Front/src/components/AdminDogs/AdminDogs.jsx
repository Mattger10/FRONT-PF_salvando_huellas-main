import "./AdminDogs.modules.css";

import CardDogs from "../CardDogs/CardDogs";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getDogs } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminDogs() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const navigate = useNavigate()
  const handleEdit = (e) => {

  };
  const handleDelete = async (id) => {
    await axios.delete("http://localhost:3001/dogs/delete/"+id)
    dispatch(getDogs());
  };
  const handleAddDog = (e) => {
    navigate('/admin/dogs/create')
  }
  const showDogs = allDogs.map((dog, index) => {
    return (
      <div key={index}>
        <CardDogs
          id={dog.id_Dog}
          nameD={dog.nameD}
          sexD={dog.sexD}
          photoD={dog.photoD}
          ageD={dog.ageD}
          sizeD={dog.sizeD}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
    );
  });

  useEffect(() => {
    dispatch(getDogs());
  }, []);
  return (
    <div>
      <button onClick={()=>{navigate('/account')}}>Volver</button>
      <h2>Gestionar Perros</h2>
      <button onClick={handleAddDog}>Agregar un perro</button>
      <div className="dogListAdmin">{showDogs}</div>
    </div>
  );
}
