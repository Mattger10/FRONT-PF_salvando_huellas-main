import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchDogs } from "../../redux/actions";
import styles from "./FilterDogs.module.css";

const FilterDogs = ({ setCurrentPage }) => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({ age: "", size: "", sex: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
    console.log(`Changed ${name} to ${value}`);
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
        <div className={styles.formRow}>
          <label className={styles.label}>
            Edad:
            <select className={styles.select} name="age" value={filters.age} onChange={handleChange}>
              <option value="">Cualquiera</option>
              <option value="Puppy">Cachorro</option>
              <option value="Adult">Adulto</option>
              <option value="Old">Viejito</option>
            </select>
          </label>
          <label className={styles.label}>
            Tamaño:
            <select className={styles.select} name="size" value={filters.size} onChange={handleChange}>
              <option value="">Cualquiera</option>
              <option value="Small">Pequeño</option>
              <option value="Medium">Mediano</option>
              <option value="Large">Grande</option>
            </select>
          </label>
          <label className={styles.label}>
            Sexo:
            <select className={styles.select} name="sex" value={filters.sex} onChange={handleChange}>
              <option value="">Cualquiera</option>
              <option value="male">Macho</option>
              <option value="female">Hembra</option>
            </select>
          </label>
          <button className={styles.buttonFilter} type="submit">
            Filtrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterDogs;
