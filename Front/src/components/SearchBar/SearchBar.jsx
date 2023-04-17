import "./SearchBar.modules.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchArticles } from "../../redux/actions";

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
    <div>
      <input
        value={text}
        onChange={handleInputChange}
        type="search"
        placeholder=" Buscar artículo..."
        className="searchBar"
      />
    </div>
  );
}
