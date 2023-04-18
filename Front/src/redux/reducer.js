import axios from "axios";
import {
  ACCESS,
  SEARCH,
  ADD_CARR,
  DELETE_CARR,
  CHANGE_CANTIDAD,
  GET_ARTICLES,
} from "./actions";

const initialState = {
  access: false,
  dogs: [],
  dogDetail: [],
  allArticles: [],
  onSearchArticles: [],
  carrito: [],
  posts: [],
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

      case 'SAVE_POSTS':
        return { 
          ...state, posts: action.payload 
        };
      
    case GET_ARTICLES:
      
      // let getArticles = {
      //   data: [
      //     {
      //       id_Article: 1,
      //       nameA: "Article A",
      //       priceA: 546.4,
      //       descriptionA: "Color blue",
      //       photoA:
      //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_uRkWh3G_5orgl61GZ6M_s5rgQk8hrI6XBCJAs-NXXZcShgk6b-CbvAkvFK36uMY-ydI&usqp=CAU",
      //       stockA: 20,
      //     },
      //   ],
      // };
      return {
        ...state,
        allArticles: action.payload,
      };
    case SEARCH:
      const name = action.payload.toUpperCase();
      if (name.length) {
        let searchResult = [...state.allArticles].filter(
          (article) => article.nameA.toUpperCase().split(name).length > 1
        );
        if (searchResult.length) {
          return {
            ...state,
            onSearchArticles: searchResult,
          };
        } else {
          return {
            ...state,
            onSearchArticles: "No se encontró " + action.payload,
          };
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
        if (elem.article.nameA === article.nameA) {
          return {
            ...state,
            carrito: [
              ...[...state.carrito].filter((art) => art.article.nameA !== name),
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
        (item) => item.article.nameA !== action.payload
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
        if (updatedCarr[i].article.nameA === action.payload.name) {
          itemPosition = i;
          newCantidad =
            Number(updatedCarr[i].cantidad) + Number(action.payload.num);
          if (updatedCarr[i].article.stockA >= newCantidad && newCantidad > 0) {
            updatedCarr[itemPosition].cantidad =
              newCantidad ||
              (action.payload.num === 1
                ? Number(updatedCarr[itemPosition].article.stockA)
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
