import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getDetail, getReferences } from "../../redux/actions";
import styles from "../DetailDog/DetailDog.module.css";

export default function DetailDogs() {
  const dispatch = useDispatch();
  const DogDeits = useSelector((state) => state.dogDetail);
  const references = useSelector((state) => state.references);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetail(id));
    dispatch(getReferences());
  }, [dispatch, id]);

  return (
    <div className={styles.detalleBackground}>
      <div>
        {Object.keys(DogDeits).length > 0 ? (
          <div className={styles.Detail}>
            <div>
              <h4>{DogDeits.nameD}</h4>
            </div>
            <img
              className={styles.imagen}
              src={DogDeits.photoD}
              alt={DogDeits.nameD}
            />
            <div className={styles.stats}>
              <span>Edad: {DogDeits.ageD}</span>
              <span>Sexo: {DogDeits.sexD}</span>
              <span>Tamaño: {DogDeits.sizeD}</span>
              <span>Historia: {DogDeits.historyD}</span>
              <div>
                Referencias:
                <ul>
                  {references.map((references) => (
                    <li key={references.id}>{references.textR}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* va a ir un logo/gif de carga y quizas se cambie el "Cargando" */}
            <p>Cargando</p>
          </div>
        )}
      </div>
      <div className={styles.containAdop}>
        <button>
          <Link className={styles.adoptame} to="/adopt">
            Adóptame
          </Link>
        </button>
      </div>
    </div>
  );
}
