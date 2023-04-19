import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getDetail } from "../../redux/actions";
import styles from "../DetailDog/DetailDog.module.css";

export default function DetailDogs() {
  const dispatch = useDispatch();
  const DogDeits = useSelector((state) => state.dogDetail);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);
  console.log("dogDeits", DogDeits);
  return (
    <div className={styles.detalleBackground}>
      
      <div>
        {Object.keys(DogDeits).length > 0 ? (
          <div className={styles.Detail}>
            <div>
              <h4>{DogDeits.nameD}</h4>
            </div>
            <img className={styles.imagen}
              src={DogDeits.photoD}
              alt={DogDeits.nameD}
              width="200"
              height="150"
            />
            <div className={styles.stats}>
              <span>Age: {DogDeits.ageD}</span>
              <span>Sex: {DogDeits.sexD}</span>
              <span>Size: {DogDeits.sizeD}</span>
              <span>History: {DogDeits.historyD}</span>
              <span>References: {DogDeits.referencesD}</span>
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
          <Link className={styles.adoptame} to="/adopt">Adóptame</Link>
        </button>
      </div>
    </div>
  );
}
