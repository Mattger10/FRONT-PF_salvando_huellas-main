import { ACCESS, SEARCH, ADD_CARR, DELETE_CARR } from "./actions";

const initialState = {
  access: false,
  dogs: [],
  dogDetail: [],
  onSearchDogs: [],
  carrito: []
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



    case SEARCH:
      const name = action.payload.toUpperCase();
      if (name.length) {
        let searchResult = [...state.dogs].filter(
          (dog) => dog.name.toUpperCase().split(name).length > 1
        );
        return {
          ...state,
          onSearchDogs: searchResult,
        };
      } else {
        return {
          ...state,
          onSearchDogs: [...state.dogs],
        };
      }

    case ADD_CARR:
      let article = action.payload.article
      let cantidad = action.payload.cant
      state.carrito.forEach(elem => {
        if (elem.article.name === article.name) {
          return {
            ...state,
            carrito: [...[...state.carrito].filter(art => art.article.name !== name), { article, cantidad }] // Si el articulo ya estaba, lo actualiza
          }
        }
      })
      return {
        ...state,
        carrito: [...state.carrito, { article, cantidad }]
      }

      case DELETE_CARR:
    const newCarrito = state.carrito.filter(item => item.article.name !== action.payload);
    return {
      ...state,
      carrito: newCarrito
    }
    
    default:
      return {
        ...state,
      };
  }



};

export default rootReducer;
