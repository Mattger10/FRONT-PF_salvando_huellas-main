import "./Shop.modules.css";
import CardArticle from "../CardArticle/CardArticle";
import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { getAllArticles } from "../../redux/actions";

export default function Shop() {

  const onSearchArticles = useSelector((state) => state.onSearchArticles);
  const allArticles = useSelector((state) => state.allArticles);

  const dispatch = useDispatch()
  const showArticles = !onSearchArticles.length ? (allArticles.map((art, index) => {
    return (
      <CardArticle
        key={index}
        name={art.name}
        price={art.price}
        image={art.image}
        stock={art.stock}
      />
    );
  })): (!(typeof onSearchArticles === "string") ? onSearchArticles.map((art, index) => {
    return (
      <CardArticle
        key={index}
        name={art.name}
        price={art.price}
        image={art.image}
        stock={art.stock}
      />
    );
  }) : onSearchArticles);

  useEffect(() => {
    dispatch(getAllArticles())
  }, []);
  return (
    <div className="shop">
      <h1>TIENDA</h1>
      <SearchBar />
      <div>{showArticles}</div>
    </div>
  );
}
