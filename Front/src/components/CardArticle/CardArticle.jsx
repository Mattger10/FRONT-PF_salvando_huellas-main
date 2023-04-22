import styles from './CardArticle.module.css';
import { useState } from 'react';
import { addCarrito } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { detailArticle, getAllArticles } from '../../redux/actions';
import axios from 'axios';
import React from 'react';

export default function CardArticle ({nameA, priceA, photoA, stockA, id}) {
  

    const [cantidad, setCantidad] = useState(1)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const [selectedStock, setSelectedStock] = useState(1)

    const detail = ()=>{   
      dispatch(detailArticle(nameA))
          
   }
    let stockOptions = []
    for (let i = 0; i < stockA; i++) {
        stockOptions.push(i+1)
    }

  const handleStockSelect = (e) => {
    let actualCant = Number(e.target.value)
    console.log(actualCant)
    if(actualCant > 0 && actualCant <= stockA){
      setCantidad(actualCant);
    }
  };
  const handleAdd = (e) => {
    dispatch(addCarrito({ nameA, priceA, photoA, stockA }, cantidad));
  };

  // FUNCIONES DE ADMINISTRADOR
  const handleEdit = () => {
    navigate('/admin/articles/'+id)
  }
  const handleDelete = async () => {
 await axios.delete("/articles/delete/"+id)
 dispatch(getAllArticles())
  }

// ASÍ SE MUESTRAN EN ADMINISTRADOR
if (location.pathname === "/admin/articles") {
  return <div className="cardArticle">
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
    
  }

  // ASI SE MUESTRAN EN SHOP
  return <div className={styles.cardArticle}>
        <Link to={`/shop/DetailArticle/${id}`}>
        <div onClick={detail} >
        <img src={photoA} alt={'foto de ' + nameA} className={styles.artImage}/>
        </div>
        </Link>
        <p className={styles.title}>{nameA}</p>
        <p>$ {priceA}</p>
        {stockA > 1 ? <p>{stockA} disponibles</p> : <p>Último disponible!</p>}
      <button onClick={handleStockSelect} value={cantidad-1}>-</button>
      <p>{cantidad}</p>
      <button onClick={handleStockSelect} value={cantidad+1}>+</button>
        <button className={styles.button}onClick={handleAdd}>Agregar al carrito</button>
    </div>
    
}

