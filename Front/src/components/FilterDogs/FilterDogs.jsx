import React, { useState } from "react";

export default function FilterDogs() {
  // Estado para el filtro de tamaño
  const [sizeFilter, setSizeFilter] = useState("");

  // Estado para el filtro de edad
  const [ageFilter, setAgeFilter] = useState("");

  // Estado para el filtro de sexo
  const [sexFilter, setSexFilter] = useState("");

  // Manejador de eventos para el cambio en el filtro de tamaño
  const handleSizeFilterChange = (e) => {
    setSizeFilter(e.target.value);
  };

  // Manejador de eventos para el cambio en el filtro de edad
  const handleAgeFilterChange = (e) => {
    setAgeFilter(e.target.value);
  };

  // Manejador de eventos para el cambio en el filtro de sexo
  const handleSexFilterChange = (e) => {
    setSexFilter(e.target.value);
  };

  return (
    <div>
      {/* Elementos de interfaz de usuario para los filtros */}
      <select value={sizeFilter} onChange={handleSizeFilterChange}>
        <option value="">Todos los tamaños</option>
        <option value="pequeño">Pequeño</option>
        <option value="mediano">Mediano</option>
        <option value="grande">Grande</option>
      </select>

      <input
        type="number"
        value={ageFilter}
        onChange={handleAgeFilterChange}
        placeholder="Edad"
      />

      <div>
        <label>
          <input
            type="radio"
            value="macho"
            checked={sexFilter === "macho"}
            onChange={handleSexFilterChange}
          />
          Macho
        </label>
        <label>
          <input
            type="radio"
            value="hembra"
            checked={sexFilter === "hembra"}
            onChange={handleSexFilterChange}
          />
          Hembra
        </label>
        <label>
          <input
            type="radio"
            value=""
            checked={!sexFilter}
            onChange={handleSexFilterChange}
          />
          Todos
        </label>
      </div>


    </div>
  );
};