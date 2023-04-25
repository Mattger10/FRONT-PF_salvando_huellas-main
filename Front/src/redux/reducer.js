
import {
  ACCESS,
  SEARCH,
  ADD_CARR,
  DELETE_CARR,
  CHANGE_CANTIDAD,
  GET_ARTICLES,
  DETAIL_ARTICLE,
  EDIT_DOG,
  UPLOAD_IMAGE
} from "./actions";

const initialState = {
  access: false,
  dogs: [],
  dogDetail: [],
  allArticles: [],
  onSearchArticles: [],
  carrito: 0,
  detailArticle: {},
  posts: [],
  loading: false,
  error: null,
  filteredDogs: [],
  opinions: [],
  filteredArticles: [],
  editDog: {},
  references: [],
  uploadImage: false
  
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

    case "SET_POSTS":
      return {
        ...state,
        posts: action.payload,
      };
      case 'GET_REFERENCES':
        return{
          ...state,
          references: action.payload,
        };
//traigo a los articulos filtrados
      case 'ARTICLES_DESC_SUCCESS':
        return {
          ...state,
          allArticles: action.payload,
          filteredArticles: action.payload,
        };
      case 'ARTICLES_DESC_FAILURE':
        return {
          ...state,
          error: action.error,
        };
      case 'ARTICLES_PRICE_ASC_SUCCESS':
        return {
          ...state,
          allArticles: action.payload,
          filteredArticles: action.payload,
        };
      case 'ARTICLES_PRICE_ASC_FAILURE':
        return {
          ...state,
          error: action.error,
        };
      case 'ARTICLES_PRICE_DESC_SUCCESS':
        return {
          ...state,
          allArticles: action.payload,
          filteredArticles: action.payload,
        };
      case 'ARTICLES_PRICE_DESC_FAILURE':
        return {
          ...state,
          error: action.error,
        };      

    //uso success y failure para manejar el estado en caso de exito o fallo en las solis
    case 'GET_OPINIONS_SUCCESS':
      return {
        ...state,
        opinions: action.payload,
        loading: false,
        error: null
      };
    case 'GET_OPINIONS_FAILURE':
      return {
        ...state,
        opinions: [],
        loading: false,
        error: action.payload
      };

    case "FETCH_DOGS_SUCCESS":
      return {
        ...state,
        dogs: action.payload,
        loading: false,
        error: null,
      };
    case "FETCH_DOGS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_DOGS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case GET_ARTICLES:
     
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
      console.log("addcarrito")
      return {
        ...state,
        carrito: state.carrito + 1
      };

    case DELETE_CARR:
      return {
        ...state,
        carrito: state.carrito - 1
      };

    case CHANGE_CANTIDAD:
      return {
        ...state,
        carrito: action.payload,
      };

    case DETAIL_ARTICLE:
      return {
        ...state,
        detailArticle: action.payload,
      };

    case EDIT_DOG:
      return {
        ...state,
        editDog: action.payload
      }

      case UPLOAD_IMAGE:
  return {
    ...state,
    image: action.payload,
  };

    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
