import "./Shop.modules.css";
import CardArticle from "../CardArticle/CardArticle";
import { useEffect, useState } from "react";

export default function Shop() {
  const [articles, setArticles] = useState([]);

  const showArticles = articles.map((art, index) => {
    return (
      <CardArticle
        key={index}
        name={art.name}
        price={art.price}
        image={art.image}
        stock={art.stock}
      />
    );
  });

  useEffect(() => {
    const response = {
      data: [
        { name: "collar", price: "250", image: "https://static.miscota.com/media/1/photos/products/115965/115965-8486886161042_1_g.jpg", stock: 25 },
        { name: "pechera", price: "350", image: "https://d28hi93gr697ol.cloudfront.net/071e89ac-46a5-8ab3/img/Producto/1273/04-1614011179-6321262b8c1d8.jpeg", stock: 15 },
        { name: "Cama para perro", price: "3000", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYPn6Q-FZRnZDuXwUmkPF_oGCB-M7bnEmUiQ&usqp=CAU", stock: 10 },

      ],
    };
    // Aquí arriba se pedirá al back, por ahora invento tres articulos
    setArticles(response.data);
  }, []);
  return (
    <div className="shop">
      <h1>TIENDA</h1>
      <div>{showArticles}</div>
    </div>
  );
}
