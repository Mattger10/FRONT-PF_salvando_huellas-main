import {
  ACCESS,
  SEARCH,
  ADD_CARR,
  DELETE_CARR,
  CHANGE_CANTIDAD,
  GET_ARTICLES,
} from "./actions";
import axios from "axios";

const initialState = {
  access: false,
  dogs: [],
  dogDetail: [],
  allArticles: [],
  onSearchArticles: [],
  carrito: [],
};
/* ESTRUCTURA DEL CARRITO
 Array que contiene objetos: 
 [
  {article: {name, image, stock, price}, cantidad: numero},
  {article: {name, image, stock, price}, cantidad: numero}
]
article es el artículo en sí con sus datos originales
cantidad es la cantidad que el comprador eligió agregar al carrito
*/

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACCESS:
      return {
        ...state,
        access: action.payload,
      };

    case "GET_DOGS":
      return {
        ...state,
        dogs: action.payload,
      };

    case "GET_DETAIL":
      return {
        ...state,
        dogDetail: action.payload,
      };
    case GET_ARTICLES: 
      // let getArticles = axios.get("")
      let getArticles = {data: [
        {name: 'Collar', price: 200, stock: 20, image: "https://www.hipermania.com.ar/wp-content/uploads/2021/06/30x45-colores.jpg"},
        {name: 'Pechera', price: 300, stock: 10, image: "https://d28hi93gr697ol.cloudfront.net/071e89ac-46a5-8ab3/img/Producto/1273/04-1614011179-6321262b8c1d8.jpeg"},
    
    ]} //HARDCODEADO HASTA QUE TENGAMOS BACK
      return {
        ...state,
        allArticles: getArticles.data
      }
    case SEARCH:
      const name = action.payload.toUpperCase();
      if (name.length) {
        let searchResult = [...state.allArticles].filter(
          (article) => article.name.toUpperCase().split(name).length > 1
        );
        if(searchResult.length){
          return {
            ...state,
            onSearchArticles: searchResult,
          };
        } else {
          return {
            ...state,
            onSearchArticles: "No se encontró " + action.payload
          }
        }
      } else {
        return {
          ...state,
          onSearchArticles: [],
        };
      }

    case ADD_CARR:
      let article = action.payload.article;
      let cantidad = action.payload.cant;
      state.carrito.forEach((elem) => {
        if (elem.article.name === article.name) {
          return {
            ...state,
            carrito: [
              ...[...state.carrito].filter((art) => art.article.name !== name),
              { article, cantidad },
            ], // Si el articulo ya estaba, lo actualiza
          };
        }
      });
      return {
        ...state,
        carrito: [...state.carrito, { article, cantidad }],
      };

    case DELETE_CARR:
      const newCarrito = state.carrito.filter(
        (item) => item.article.name !== action.payload
      ); //payload ya tiene el nombre del articulo
      return {
        ...state,
        carrito: newCarrito,
      };

    case CHANGE_CANTIDAD:
      let itemPosition;
      let newCantidad;
      let updatedCarr = [...state.carrito];
      for (let i = 0; i < updatedCarr.length; i++) {
        if (updatedCarr[i].article.name === action.payload.name) {
          itemPosition = i;
          newCantidad =
            Number(updatedCarr[i].cantidad) + Number(action.payload.num);
          if (updatedCarr[i].article.stock >= newCantidad && newCantidad > 0) {
            updatedCarr[itemPosition].cantidad =
              newCantidad ||
              (action.payload.num === 1
                ? Number(updatedCarr[itemPosition].article.stock)
                : 1);
          }
        }
      }
      return {
        ...state,
        carrito: updatedCarr,
      };

    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
