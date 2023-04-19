import axios from "axios";
// Action types

export const ACCESS = "ACCESS";
export const SEARCH = "SEARCH";
export const ADD_CARR = "ADD_CARR";
export const DELETE_CARR = "DELETE_CARR";
export const CHANGE_CANTIDAD = "CHANGE_CANTIDAD";
export const GET_ARTICLES = "GET_ARTICLES";
export const DETAIL_ARTICLE = "DETAIL_ARTICLE"

// Actions

// Controla si el usuario está logeado o no.
export function handleAccess(data) {
  return {
    type: ACCESS,
    payload: data,
  };
}

//traigo a los perros con la api -iri-
export function getDogs() {
  return async (dispatch) => {
    try {
      let dog = await axios("http://localhost:3001/dogs");
      return dispatch({
        //uso la comilla simple para no exportar y hacerlo mas simple
        type: "GET_DOGS",
        payload: dog.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//Traigo a los perros por su id para el detail -iri-
export const getDetail = (id) => {
  return async function (dispatch) {
    try {
      const dogDetail = await axios.get(`http://localhost:3001/dogs/${id}`);
      dispatch({
        type: "GET_DETAIL",
        payload: dogDetail.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export function getAllArticles(){
  return async function (dispatch) {
    let getArticles = await axios.get("http://localhost:3001/articles")
    dispatch({
      type: GET_ARTICLES,
      payload: getArticles.data
    })
  }
}

export function searchArticles(text) {
  return {
    type: SEARCH,
    payload: text,
  };
}

// Añadir al carrito
export function addCarrito(article, cant) {
  return {
    type: ADD_CARR,
    payload: { article, cant },
  };
}

//eliminar del carrito
export function deleteCarrito(name) {
  return {
    type: DELETE_CARR,
    payload: name,
  };
}

//actualizar carrito
export function changeCantidad(num, name) {
  return {
    type: CHANGE_CANTIDAD,
    payload: { num, name },
  };
}


export function detailArticle(id){
  return async function(dispatch){
  let getArticles = await axios.get(`http://localhost:3001/articles/${id}`)
  dispatch({
    type: DETAIL_ARTICLE,
    payload: getArticles.data,
  })}
}

//traigo a los post
export const getPosts = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:3001/posts');
    const posts = response.data;
    console.log(posts); // <--- Aquí puedes hacer el console.log
    dispatch({ type: 'SET_POSTS', payload: posts });
  } catch (error) {
    console.error(error);
  }
};

//filtro para Dogs 
export const fetchDogs = (age, size, sex) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:3001/dogs?age=${age}&size=${size}&sex=${sex}`);
    const data = await response.json();
    dispatch({
      type: 'FETCH_DOGS_SUCCESS',
      payload: data
    });
  } catch (error) {
    dispatch({
      type: 'FETCH_DOGS_FAILURE',
      error: error.message
    });
  }
};


