import axios from 'axios';
// Action types

export const ACCESS = "ACCESS";
export const SEARCH = "SEARCH";

// Actions

// Controla si el usuario está logeado o no.
export function handleAccess(data) {
  return {
    type: ACCESS,
    payload: data,
  };
}

//traigo a los perros con la api
export function getDogs() {
  return async (dispatch) => {
    try {
      let dog = await axios("https://api.thedogapi.com/v1/breeds");
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

// Buscar por nombre
export function searchDogs (text) {
  return {
    type: SEARCH,
    payload: text
  }
}