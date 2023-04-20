import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchDogs } from "../../redux/actions";
import styles from "./FilterDogs.module.css"

const FilterDogs = ({ setCurrentPage }) => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({ age: "", size: "", sex: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Filters: ", filters);
    dispatch(fetchDogs(filters.age, filters.size, filters.sex));
    setCurrentPage(1);
  };

  return (
    <div className={styles.filters}>
      <form onSubmit={handleSubmit}>
        <label>
          Edad:
          <select name="age" value={filters.age} onChange={handleChange}>
            <option value="">Cualquiera</option>
            <option value="Puppy">Cachorro</option>
            <option value="Adult">Adulto</option>
            <option value="Old">Viejito</option>
          </select>
        </label>
        <label>
          Tamaño:
          <select name="size" value={filters.size} onChange={handleChange}>
            <option value="">Cualquiera</option>
            <option value="Small">Pequeño</option>
            <option value="Medium">Mediano</option>
            <option value="Large">Grande</option>
          </select>
        </label>
        <label>
          Sexo:
          <select name="sex" value={filters.sex} onChange={handleChange}>
            <option value="">Cualquiera</option>
            <option value="Male">Macho</option>
            <option value="Female">Hembra</option>
          </select>
        </label>

        <button type="submit">Filtrar</button>
      </form>
    </div>
  );
};

export default FilterDogs;
