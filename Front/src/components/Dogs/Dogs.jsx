import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "../../redux/actions";
import CardDogs from "../CardDogs/CardDogs.jsx";
import PaginationDogs from '../PaginationDogs/PaginationDogs.jsx';
import styles from '../Dogs/Dogs.module.css';
import perrito from "../../assets/perroTriste.webp"
import FilterDogs from "../FilterDogs/FilterDogs";

const Dogs = () => {
  const dispatch = useDispatch();
  //para manipular los states
  const allDog = useSelector((state) => state.dogs);
  // Creamos un state con la pagina actual y otro que haga set
  const [currentPage, setCurrentPage] = useState(1);
  console.log(currentPage);
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
  }, [dispatch]);

 
   // Archivo de un arreglo de 10 objetos de perros con datos reales
const dogsData = [
    {
      id: 1,
      nameD: 'Perro 1',
      image: 'https://ruta-imagen-1.jpg',
      sexD: 'Macho',
      ageD: '2 años',
      sizeD: 'Mediano',
      historyD: 'Historia del perro 1',
    },
    {
      id: 2,
      nameD: 'Perro 2',
      image: 'https://ruta-imagen-2.jpg',
      sexD: 'Hembra',
      ageD: '3 años',
      sizeD: 'Grande',
      historyD: 'Historia del perro 2',
    },
    {
      id: 3,
      nameD: 'Perro 3',
      image: 'https://ruta-imagen-3.jpg',
      sexD: 'Macho',
      ageD: '1 año',
      sizeD: 'Pequeño',
      historyD: 'Historia del perro 3',
    },
    {
      id: 4,
      nameD: 'Perro 4',
      image: 'https://ruta-imagen-4.jpg',
      sexD: 'Hembra',
      ageD: '4 años',
      sizeD: 'Mediano',
      historyD: 'Historia del perro 4',
    },
    {
      id: 5,
      nameD: 'Perro 5',
      image: 'https://ruta-imagen-5.jpg',
      sexD: 'Macho',
      ageD: '3 años',
      sizeD: 'Grande',
      historyD: 'Historia del perro 5',
    },
    {
      id: 6,
      nameD: 'Perro 6',
      image: 'https://ruta-imagen-6.jpg',
      sexD: 'Hembra',
      ageD: '2 años',
      sizeD: 'Mediano',
      historyD: 'Historia del perro 6',
    },
    {
      id: 7,
      nameD: 'Perro 7',
      image: 'https://ruta-imagen-7.jpg',
      sexD: 'Macho',
      ageD: '5 años',
      sizeD: 'Grande',
      historyD: 'Historia del perro 7',
    },
    {
      id: 8,
      nameD: 'Perro 8',
      image: 'https://ruta-imagen-8.jpg',
      sexD: 'Hembra',
      ageD: '2 años',
      sizeD: 'Pequeño',
      historyD: 'Historia del perro 8',
    },
    {
      id: 9,
      nameD: 'Perro 9',
      image: 'https://ruta-imagen-9.jpg',
      sexD: 'Macho',
      ageD: '3 años',
      sizeD: 'Mediano',
      historyD: 'Historia del perro 9',
    },
    {
      id: 10,
      nameD: 'Perro 10',
      image: 'https://ruta-imagen-10.jpg',
      sexD: 'Hembra',
      ageD: '4 años',
      sizeD: 'Grande',
      historyD: 'Historia del perro 10',
    }
  ];
  return (
    <>
    <div>
    <FilterDogs setCurrentPage={setCurrentPage} dogsData={dogsData}/>
    </div>
    <div className={styles.CardDogs}>
        {dogsData.length === 0 ? (
            <img className={styles.image} src={perrito} alt="No puppies :(" ></img>
        ) : (
            dogsData.map((c) => {
                return (
                    <div>
                    <div key={c.id}>
                        <CardDogs
                        nameD={c.nameD}
                        photoD={c.image}
                        sexD={c.sexD}
                        ageD={c.ageD}
                        sizeD={c.sizeD}
                        historyD={c.historyD}
                        />
                    </div>
                </div>
                );
            })
        )}
   
   <div>
     <PaginationDogs
      dogsPerPage={DogPerPage}
      totalDogs={dogsData.length}
      currentPage={currentPage}
      paging={paging}
      />
   </div>
    </div>
    </>
  );
};

export default Dogs;