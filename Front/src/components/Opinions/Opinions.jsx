import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOpinions } from "../../redux/actions";
import styles from "../Opinions/Opinions.module.css";

const Opinions = () => {
  const dispatch = useDispatch();
  const opinionsList = useSelector((state) => state.opinions);
  //\u2606 es el unicode de la estrella
  function getStarsFromQualification(qualification) {
    let stars = "";
    for (let i = 0; i < qualification; i++) {
      stars += "⭐️";
    }
    return stars;
  }

  const loading = useSelector((state) => state.opinions.loading);
  const error = useSelector((state) => state.opinions.error);

  useEffect(() => {
    dispatch(getOpinions())
     
  }, [dispatch]);

  const ratings = {
    5: { count: 0, sum: 0 },
    4: { count: 0, sum: 0 },
    3: { count: 0, sum: 0 },
    2: { count: 0, sum: 0 },
    1: { count: 0, sum: 0 },
  };

  // Calcular la suma total y la cantidad de cada calificación
  opinionsList.forEach((opinion) => {
    ratings[opinion.qualificationO].count++;
    ratings[opinion.qualificationO].sum += opinion.qualificationO;
  });

  const starsCount = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  const averageRating =
    Object.values(ratings).reduce((a, b) => a + b.sum, 0) /
    Object.values(ratings).reduce((a, b) => a + b.count, 0);

  Object.keys(ratings).forEach((key) => {
    const rating = ratings[key];
    starsCount[key] = rating.count;
  });

  return (
    <div className={styles.container}>
      <div className={styles.resumen}>
        <h2>Resumen de clasificaciones</h2>
        <ul>
          <li>
            <span className={styles.ratinglabel}>Promedio:</span>
            <span className={styles.ratingvalue}>{averageRating.toFixed(2)}</span>
          </li>
          <li>
            <span className={styles.ratinglabel}>5 estrellas:</span>
            <span className={styles.ratingcount}>{starsCount[5]}</span>
            <span className={styles.ratingstars}>
              {starsCount[5] > 0
                ? Array(starsCount[5])
                    .fill()
                    .map((_, i) => <span key={i}>&#9608;</span>)
                : null}
            </span>
          </li>
          <li>
            <span className={styles.ratinglabel}>4 estrellas:</span>
            <span className={styles.ratingcount}>{starsCount[4]}</span>
            <span className={styles.ratingstars}>
              {starsCount[4] > 0
                ? Array(starsCount[4])
                    .fill()
                    .map((_, i) => <span key={i}>&#9608;</span>)
                : null}
            </span>
          </li>
          <li>
            <span className={styles.ratinglabel}>3 estrellas:</span>
            <span className={styles.ratingcount}>{starsCount[3]}</span>
            <span className={styles.ratingstars}>
              {starsCount[3] > 0
                ? Array(starsCount[3])
                    .fill()
                    .map((_, i) => <span key={i}>&#9608;</span>)
                : null}
            </span>
          </li>
          <li>
            <span className={styles.ratinglabel}>2 estrellas:</span>
            <span className={styles.ratingcount}>{starsCount[2]}</span>
            <span className={styles.ratingstars}>
              {starsCount[2] > 0
                ? Array(starsCount[2])
                    .fill()
                    .map((_, i) => <span key={i}>&#9608;</span>)
                : null}
            </span>
          </li>
          <li>
            <span className={styles.ratinglabel}>1 estrella:</span>
            <span className={styles.ratingcount}>{starsCount[1]}</span>
            <span className={styles.ratingstars}>
              {starsCount[1] > 0
                ? Array(starsCount[1])
                    .fill()
                    .map((_, i) => <span key={i}>&#9608;</span>)
                : null}
            </span>
          </li>
        </ul>
      </div>

      <div className={styles.clasificaciones}>
        <h2>Clasificaciones y opiniones</h2>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {opinionsList.map((opinion) => (
          <div key={opinion.id_Opinion}>
            <p>{opinion.commentO}</p>
            <p>{getStarsFromQualification(opinion.qualificationO)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Opinions;
