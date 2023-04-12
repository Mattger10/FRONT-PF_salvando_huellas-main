import axios from 'axios';
// Action types

export const ACCESS = "ACCESS";

// Actions

export function access(data) {
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