import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOpinions } from '../actions/opinionsActions';

const Opinions = () => {
    const dispatch = useDispatch();
//\u2606 es el unicode de la estrella
    function getStarsFromQualification(qualification) {
        let stars = '';
        for (let i = 0; i < qualification; i++) {
          stars += '⭐️';
        }
        return stars;
      }

    useEffect(() => {
      dispatch(getOpinions());
    }, [dispatch]);
  
    const opinionsList = useSelector(state => state.opinions.opinions);
    const loading = useSelector(state => state.opinions.loading);
    const error = useSelector(state => state.opinions.error);
  
    return (
  <div>
    {loading ? (
      <p>Loading...</p>
    ) : error ? (
      <p>{error}</p>
    ) : (
      <div>
        {opinionsList.map(opinion => (
          <div key={opinion.id_Opinion}>
            <h2>Clasificaciones y opiniones</h2>
            <p>{opinion.commentO}</p>
            <p>{getStarsFromQualification(opinion.qualificationO)}</p>
          </div>
        ))}
      </div>
    )}
  </div>
);
 }
  
  export default Opinions;
  