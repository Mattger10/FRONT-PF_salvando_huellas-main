import "./SearchBar.modules.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchDogs } from "../../redux/actions";

// DUDAS CONSULTAR A VALENTIN
export default function SearchBar() {
  const dispatch = useDispatch();
  const search = (name) => {
    // Función que busca en la base de datos
    // Guarda el resultado en un state global, de donde
    // se toman los perros guardados para mostrarlos en "onSearchDogs" del reducer.
    dispatch(searchDogs(name))
  };

  const [text, setText] = useState("");

  const handleInputChange = (event) => {
    const input = event.target.value;
    setText(input);
    search(input);
  };

  return (
    <div>
      <input
        value={text}
        onChange={handleInputChange}
        type="search"
        placeholder=" Buscar por nombre..."
        className="searchBar"
      />
    </div>
  );
}
