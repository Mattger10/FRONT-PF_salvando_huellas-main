import "./AdminDogs.modules.css";

import CardDogs from "../CardDogs/CardDogs";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getDogs } from "../../redux/actions";

export default function AdminDogs() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const showDogs = allDogs.map((dog, index) => {
    return (
      <div key={index}>
        <CardDogs
          
          id={dog.id_Dog}
          nameD={dog.nameD}
          sexD={dog.sexD}
          photoD={dog.photoD}
          ageD={dog.ageD}
          sizeD={dog.sizeD}
        />
      </div>
    );
  });

  useEffect(() => {
    dispatch(getDogs());
  }, []);
  return (
    <div>
      <h2>Gestionar Perros</h2>
      <button>Agregar un perro</button>
      <div className="dogListAdmin">{showDogs}</div>
    </div>
  );
}
