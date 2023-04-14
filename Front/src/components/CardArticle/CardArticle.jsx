import './CardArticle.modules.css';
import { useState } from 'react';
import { addCarrito } from '../../redux/actions';
import { useDispatch } from 'react-redux';

export default function CardArticle ({name, price, image, stock}) {

    const [cantidad, setCantidad] = useState(1)
    const dispatch = useDispatch()

    let stockOptions = []
    for (let i = 0; i < stock; i++) {
        stockOptions.push(i+1)
    }

    const handleStockSelect = (e)=>{
        setCantidad(e.target.value)
    }
    const handleAdd = (e)=>{
        dispatch(addCarrito({name, price, image, stock}, cantidad))
    }

    return <div className='cardArticle'>
        <img src={image} alt={'foto de ' + name} className='artImage'/>
        <p>{name}</p>
        <p>$ {price}</p>
        <p>{stock} disponibles</p>
        <button className="button"onClick={handleAdd}>Agregar al carrito</button>
        <select onChange={handleStockSelect}>
            {stockOptions.map((num, ind) => {
                return <option key={ind}>{num}</option>
            })}
        </select>
    </div>
}