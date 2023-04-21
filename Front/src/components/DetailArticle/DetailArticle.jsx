import React, { useState, useEffect } from 'react';
import style from './Article.module.css';
import { addCarrito } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom"
import { detailArticle } from '../../redux/actions';

export default function DetailsArticle() {

    const detail = useSelector(state=> state.detailArticle)
    const [cantidad, setCantidad] = useState(1);
    const dispatch = useDispatch();
    const { id } = useParams();

    let stockOptions = [];
    for (let i = 0; i < detail.stockA; i++) {
        stockOptions.push(i + 1);
    }

    const handleStockSelect = (e) => {
        setCantidad(e.target.value);
    }

    const handleAdd = (e) => {
        dispatch(addCarrito({
            nameA: detail.nameA,
            priceA: detail.priceA,
            photoA: detail.photoA,
            stockA: detail.stockA,
            descriptionA: detail.descriptionA
        }, cantidad));
    }

useEffect(()=>{
  dispatch(detailArticle(id))
},[])


    return (
        <div className={style.detailsArticle}>

            <div className={style.detailsLeft}>
                <img
                    className={style.img}
                    src={detail.photoA}
                    alt={"foto de " + detail.nameA}
                />
            </div>

            <div className={style.detailsRight}>
                <p>{detail.nameA}</p>
                <p className={style.price}>$ {detail.priceA}</p>
                <p className={style.description}>{detail.descriptionA}</p>
                {detail.stockA > 1 ? <p>{detail.stockA} disponibles</p> : <p>Último disponible!</p>}
                <select onChange={handleStockSelect}>
                    {stockOptions.map((num, ind) => {
                        return <option key={ind}>{num}</option>
                    })}
                </select>
                <button className={style.button} onClick={handleAdd}>Agregar al carrito</button>
            </div>
        </div>
    );
}