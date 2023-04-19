import "./CardArticle.modules.css";
import { useState } from "react";
import { addCarrito } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export default function CardArticle({ nameA, priceA, photoA, stockA }) {
  const [cantidad, setCantidad] = useState(1);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

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
    let id = 1 //temporal
    navigate('/admin/articles/'+id)
  }
  const handleDelete = () => {
 // axios.delete
  }

  // ASÍ SE MUESTRAN EN ADMINISTRADOR
  if (location.pathname === "/admin/articles") {
    return (
      <div className="cardArticle">
        <img src={photoA} alt={"foto de " + nameA} className="artImage" />
        <p>{nameA}</p>
        <p>$ {priceA}</p>
        {stockA > 1 ? <p>{stockA} disponibles</p> : <p>Último disponible!</p>}
        <button className="button" onClick={handleEdit}>
          Editar
        </button>
        <button className="button" onClick={handleDelete}>
          Eliminar
        </button>
      </div>
    );
  }

  // ASI SE MUESTRAN EN SHOP
  return (
    <div className="cardArticle">
      <img src={photoA} alt={"foto de " + nameA} className="artImage" />
      <p>{nameA}</p>
      <p>$ {priceA}</p>
      {stockA > 1 ? <p>{stockA} disponibles</p> : <p>Último disponible!</p>}
      <button className="button" onClick={handleAdd}>
        Agregar al carrito
      </button>
      <select onChange={handleStockSelect}>
        {stockOptions.map((num, ind) => {
          return <option key={ind}>{num}</option>;
        })}
      </select>
    </div>
  );
}
