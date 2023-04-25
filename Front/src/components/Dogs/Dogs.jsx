import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "../../redux/actions";
import CardDogs from "../CardDogs/CardDogs.jsx";
import PaginationDogs from "../PaginationDogs/PaginationDogs.jsx";
import styles from "../Dogs/Dogs.module.css";
import perrito from "../../assets/perroTriste.webp";
import FilterDogs from "../FilterDogs/FilterDogs";
import { Link } from "react-router-dom";

const Dogs = () => {
  const dispatch = useDispatch();
  //para manipular los states
  const allDog = useSelector((state) => state.dogs);

  // Creamos un state con la pagina actual y otro que haga set
  const [currentPage, setCurrentPage] = useState(1);

  const [DogPerPage, setDogPerPage] = useState(10);
  const indexLastDog = currentPage * DogPerPage;
  const indexFirstDog = indexLastDog - DogPerPage;

  //para marcar la distancia el slice parte a la mitad.
  const currentDog = allDog.slice(indexFirstDog, indexLastDog);
  //para setear la pagina en ese numero de pagina.
  const paging = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    
    dispatch(getDogs());
  }, [dispatch]);

  return (
    <>
      <div>
        <FilterDogs setCurrentPage={setCurrentPage} currentDog={currentDog} />
      </div>
      <div className={styles.containerCards}>
        <div className={styles.CardDogs}>
          {currentDog.length === 0 ? (
            <img
              className={styles.image}
              src={perrito}
              alt="No puppies :("
            ></img>
          ) : (
            currentDog.map((c, index) => {
              return (
                <div key={index}>
                  <Link className={styles.name} to={"/dogs/" + c.id_Dog}>
                    <CardDogs
                      nameD={c.nameD}
                      photoD={c.photoD}
                      sexD={c.sexD}
                      ageD={c.ageD}
                      sizeD={c.sizeD}
                    />
                  </Link>
                </div>
              );
            })
          )}
        </div>
      </div>
      <div>
        <PaginationDogs
          currentPage={currentPage}
          paging={paging}
          totalPages={Math.ceil(allDog.length / DogPerPage)}
        />
      </div>
    </>
  );
};

export default Dogs;
