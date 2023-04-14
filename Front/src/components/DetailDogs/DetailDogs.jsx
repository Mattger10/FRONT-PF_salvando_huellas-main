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
          <h4>{dogDeits.nameD}</h4>
          <div />
          <div>
            <img src={dogDeits.photoD} alt={dogDeits.name} />
          </div>
          <div>
            <span>Name: {dogDeits.nameD}</span>
            <span>Age: {dogDeits.ageD}</span>
            <span>Size: {dogDeits.sizeD}</span>
            <span>Sex: {dogDeits.sexD}</span>
            <span>Description: {dogDeits.descriptionD}</span>
            <span>References: {dogDeits.referencesD}</span>
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
