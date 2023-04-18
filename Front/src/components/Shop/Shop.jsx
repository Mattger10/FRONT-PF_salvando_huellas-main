import "./Shop.modules.css";
import CardArticle from "../CardArticle/CardArticle";
import { useEffect} from "react";
import SearchBar from "../SearchBar/SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { getAllArticles } from "../../redux/actions";

export default function Shop() {

  const onSearchArticles = useSelector((state) => state.onSearchArticles);
  const allArticles = useSelector((state) => state.allArticles);

  const dispatch = useDispatch()
  // console.log(allArticles)
  const showArticles = !onSearchArticles.length ? (allArticles.map((art, index) => {
    return (
      <CardArticle
        key={index}
        nameA={art.nameA}
        priceA={art.priceA}
        photoA={art.photoA}
        stockA={art.stockA}
      />
    );
  })): (!(typeof onSearchArticles === "string") ? onSearchArticles.map((art, index) => {
    return (
      <CardArticle
        key={index}
        nameA={art.nameA}
        priceA={art.priceA}
        photoA={art.photoA}
        stockA={art.stockA}
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
