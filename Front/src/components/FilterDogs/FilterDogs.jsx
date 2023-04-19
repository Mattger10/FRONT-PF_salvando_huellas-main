import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchDogs } from '../../redux/actions';

const FilterDogs = ({ setCurrentPage }) => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({ age: '', size: '', sex: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    let newValue = value;
    if (name === "sex") {
      newValue = value === "true" ? "Male" : "Female";
    }
    setFilters((prevState) => ({ ...prevState, [name]: newValue }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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
            <option value="puppy">Puppy</option>
            <option value="adult">Adult</option>
            <option value="old">Old</option>
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
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <button type="submit">Filter</button>
      </form>
    </div>
  );
};

export default FilterDogs;
