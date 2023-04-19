import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchDogs } from "../../redux/actions";

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
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Age:
          <select name="age" value={filters.age} onChange={handleChange}>
            <option value="">Any</option>
            <option value="Puppy">Puppy</option>
            <option value="Adult">Adult</option>
            <option value="Old">Old</option>
          </select>
        </label>
        <label>
          Size:
          <select name="size" value={filters.size} onChange={handleChange}>
            <option value="">Any</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </label>
        <label>
          Sex:
          <select name="sex" value={filters.sex} onChange={handleChange}>
            <option value="">Any</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </label>

        <button type="submit">Filter</button>
      </form>
    </div>
  );
};

export default FilterDogs;
