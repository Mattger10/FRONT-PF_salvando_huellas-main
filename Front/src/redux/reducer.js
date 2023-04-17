import { ACCESS, SEARCH, ADD_CARR, DELETE_CARR, CHANGE_CANTIDAD } from "./actions";

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
    const newCarrito = state.carrito.filter(item => item.article.name !== action.payload); //payload ya tiene el nombre del articulo
    return {
      ...state,
      carrito: newCarrito
    }

    case CHANGE_CANTIDAD:
      let itemPosition
      let newCantidad
      let updatedCarr = [...state.carrito]
      for (let i = 0; i < updatedCarr.length; i++) {
        if (updatedCarr[i].article.name === action.payload.name){
          itemPosition = i
          newCantidad = Number(updatedCarr[i].cantidad) + Number(action.payload.num)
          if(updatedCarr[i].article.stock >= newCantidad && newCantidad > 0){
            updatedCarr[itemPosition].cantidad = newCantidad || (action.payload.num === 1 ? Number(updatedCarr[itemPosition].article.stock) : 1)
          }
        }
      }
      return {
        ...state,
        carrito: updatedCarr
      }
    
    default:
      return {
        ...state,
      };
  }



};

export default rootReducer;
