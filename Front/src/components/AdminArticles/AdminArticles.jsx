import "./AdminArticles.modules.css";
import CardArticle from "../CardArticle/CardArticle";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllArticles } from "../../redux/actions";

export default function AdminArticles() {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.allArticles);
  const showArticles = articles.map((art, index) => {
    return (
      <CardArticle
        key={index}
        id={art.id_Article}
        nameA={art.nameA}
        priceA={art.priceA}
        photoA={art.photoA}
        stockA={art.stockA}
      />
    );
  });

  useEffect(() => {
    dispatch(getAllArticles());
  }, []);
  return (
    <div>
      <h2>Gestionar Artículos</h2>
      <div className="artListAdmin">{showArticles}</div>
    </div>
  );
}
