import styles from "./SearchBar.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchArticles } from "../../redux/actions";
import React from "react";

export default function SearchBar() {
  const dispatch = useDispatch();
  const search = (name) => {
    dispatch(searchArticles(name));
  };

  const [text, setText] = useState("");

  const handleInputChange = (event) => {
    const input = event.target.value;
    setText(input);
    search(input);
  };

  return (
    <div className={styles.searchBar}>
      <div className={styles.group}>
      <svg className={styles.icon} aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
      <input 
        value={text}
        onChange={handleInputChange}
        type="search"
        placeholder=" Buscar artículo"
        className={styles.input}
      />
      </div>
    </div>
  );
}
