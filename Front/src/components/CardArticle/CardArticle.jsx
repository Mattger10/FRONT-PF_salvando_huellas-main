import './CardArticle.modules.css';
import { useState } from 'react';
import { addCarrito } from '../../redux/actions';
import { useDispatch } from 'react-redux';

export default function CardArticle ({nameA, priceA, photoA, stockA}) {

    const [cantidad, setCantidad] = useState(1)
    const dispatch = useDispatch()

    let stockOptions = []
    for (let i = 0; i < stockA; i++) {
        stockOptions.push(i+1)
    }

    const handleStockSelect = (e)=>{
        setCantidad(e.target.value)
    }
    const handleAdd = (e)=>{
        dispatch(addCarrito({nameA, priceA, photoA, stockA}, cantidad))
    }

    return <div className='cardArticle'>
        <img src={photoA} alt={'foto de ' + nameA} className='artImage'/>
        <p>{nameA}</p>
        <p>$ {priceA}</p>
        {stockA > 1 ? <p>{stockA} disponibles</p> : <p>Último disponible!</p>}
        <button className="button"onClick={handleAdd}>Agregar al carrito</button>
        <select onChange={handleStockSelect}>
            {stockOptions.map((num, ind) => {
                return <option key={ind}>{num}</option>
            })}
        </select>
    </div>
}