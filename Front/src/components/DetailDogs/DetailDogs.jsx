import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getDetail } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

export default function Detail() {
  const dispacth = useDispatch();
  const dogDeits = useSelector((state) => state.dogDetail);
  const { id } = useParams();

  useEffect(() => {
    dispacth(getDetail(id));
  }, [dispacth, id]);

  return (
    <div>
      <div>
        <button>
          <Link to="/adopt">ADOPT ME!</Link>
        </button>
      </div>

      {Object.keys(dogDeits).length > 0 ? (
        <div>
          <h4>{dogDeits.name}</h4>
          <div />
          <div>
            <img src={dogDeits.image} alt={dogDeits.name} />
          </div>
          <div>
            <span>Nombre: {dogDeits.name}</span>
            <span>Age: {dogDeits.age}</span>
            <span>Size: {dogDeits.size}</span>
            <span>Sex: {dogDeits.sex}</span>
            <span>Description: {dogDeits.description}</span>
            <span>References: {dogDeits.references}</span>
          </div>
        </div>
      ) : (
        {
          /*ACA VA A IR UNA RUEDA DE CARGA O ALGO PARECIDO <p></p> */
        }
      )}
    </div>
  );
}
