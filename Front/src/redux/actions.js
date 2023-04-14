import axios from 'axios';
// Action types

export const ACCESS = "ACCESS";
export const SEARCH = "SEARCH";
export const ADD_CARR = "ADD_CARR";

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
        type: 'GET_DOGS',
        payload: dog.data
      })
    } catch(error) {
      console.log(error);
    }
  }
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


export function searchDogs (text) {
  return {
    type: SEARCH,
    payload: text
  }
}

// Añadir al carrito
export function addCarrito (article, cant){
  return {
    type: ADD_CARR,
    payload: {article, cant}
  }
}

