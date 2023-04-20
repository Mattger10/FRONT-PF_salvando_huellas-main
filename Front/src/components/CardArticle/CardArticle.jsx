import styles from "./CardArticle.module.css";
import { useState } from "react";
import { addCarrito } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { detailArticle } from "../../redux/actions";

import { detailArticle, getAllArticles } from '../../redux/actions';
import axios from 'axios';


export default function CardArticle({ nameA, priceA, photoA, stockA, id }) {
  const [cantidad, setCantidad] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const detail = () => {
    dispatch(detailArticle(nameA));
  };
  let stockOptions = [];
  for (let i = 0; i < stockA; i++) {
    stockOptions.push(i + 1);
  }

  const handleStockSelect = (e) => {
    setCantidad(e.target.value);
  };
  const handleAdd = (e) => {
    dispatch(addCarrito({ nameA, priceA, photoA, stockA }, cantidad));
  };

  // FUNCIONES DE ADMINISTRADOR
  const handleEdit = () => {

    // dispatch(detailArticle(id))
    navigate("/admin/articles/" + id);
  };
  const handleDelete = () => {
    // axios.delete
  };

    navigate('/admin/articles/'+id)
  }
  const handleDelete = async () => {
 await axios.delete("http://localhost:3001/articles/delete/"+id)
 dispatch(getAllArticles())
  }


  // ASÍ SE MUESTRAN EN ADMINISTRADOR
  if (location.pathname === "/admin/articles") {
    return (
      <div className={styles.cardArticle}>
        <img src={photoA} alt={"foto de " + nameA} className={styles.artImage} />
        <p>{nameA}</p>
        <p>$ {priceA}</p>
        {stockA > 1 ? <p>{stockA} disponibles</p> : <p>Último disponible!</p>}
        <button className={styles.button} onClick={handleEdit}>
          Editar
        </button>
        <button className={styles.button} onClick={handleDelete}>
          Eliminar
        </button>
      </div>
    );
  }

  // ASI SE MUESTRAN EN SHOP
  return (
    <div className={styles.cardArticle}>
      <Link to={`/shop/DetailArticle/${id}`}>
        <div onClick={detail}>
          <img src={photoA} alt={"foto de " + nameA} className={styles.artImage} />
          <p>{nameA}</p>
        </div>
      </Link>
      <p className={styles.price}>$ {priceA}</p>
      {stockA > 1 ? <p>{stockA} disponibles</p> : <p>Último disponible!</p>}
      <select className={styles.select} onChange={handleStockSelect}>
        {stockOptions.map((num, ind) => {
          return <option key={ind}>{num}</option>;
        })}
      </select>
      <button className={styles.button} onClick={handleAdd}>
        Agregar al carrito
      </button>
    </div>
  );
}
