import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getPosts } from "../../redux/actions";
import CardDogs from "../CardDogs/CardDogs.jsx";
import PaginationDogs from '../PaginationDogs/PaginationDogs.jsx';
import styles from '../Dogs/Dogs.module.css';
import perrito from "../../assets/perroTriste.webp"
import FilterDogs from "../FilterDogs/FilterDogs";


const Dogs = () => {
  const dispatch = useDispatch();
  //para manipular los states
  const allDog = useSelector((state) => state.dogs);
  const posts = useSelector((state) => state.posts);
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
    console.log("Fetching dogs...");
    dispatch(getDogs());
    dispatch(getPosts());
  }, [dispatch]);

 
  return (
    <>
    <div>
    <FilterDogs setCurrentPage={setCurrentPage} currentDog={currentDog}/>
    </div>
    <div className={styles.CardDogs}>
        {currentDog.length === 0 ? (
            <img className={styles.image} src={perrito} alt="No puppies :(" ></img>
        ) : (
          currentDog.map((c) => {
                return (
                    <div>
                    <div key={c.id}>
                        <CardDogs
                        nameD={c.nameD}
                        photoD={c.photoD}
                        sexD={c.sexD}
                        ageD={c.ageD}
                        sizeD={c.sizeD}
                        postD={posts.filter(post => post.id_Dog === c.id)}
                        />
                    </div>
                </div>
                );
            })
        )}
   
   <div>
     <PaginationDogs
    currentPage={currentPage}
    paging={paging}
    totalPages={Math.ceil(allDog.length / DogPerPage)}
  />
   </div>
    </div>
    </>
  );
};


export default Dogs;