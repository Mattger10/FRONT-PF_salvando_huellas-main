import axios from "axios";
// Action types

export const ACCESS = "ACCESS";
export const SEARCH = "SEARCH";
export const ADD_CARR = "ADD_CARR";
export const DELETE_CARR = "DELETE_CARR";
export const CHANGE_CANTIDAD = "CHANGE_CANTIDAD";
export const GET_ARTICLES = "GET_ARTICLES";
export const DETAIL_ARTICLE = "DETAIL_ARTICLE";
export const EDIT_DOG = "EDIT_DOG";
export const UPLOAD_IMAGE = "UPLOAD_IMAGE";

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
      let dog = await axios("/dogs");
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
      const dogDetail = await axios.get(`/dogs/${id}`);
      dispatch({
        type: "GET_DETAIL",
        payload: dogDetail.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export function getAllArticles() {
  return async function (dispatch) {
    let getArticles = await axios.get("/articles");
    dispatch({
      type: GET_ARTICLES,
      payload: getArticles.data,
    });
  };
}

export function searchArticles(text) {
  return {
    type: SEARCH,
    payload: text,
  };
}

// Añadir al carrito
export function addCarrito() {
  return {
    type: ADD_CARR,
  };
}

//eliminar del carrito
export function deleteCarrito() {
  return {
    type: DELETE_CARR,
  };
}

// actualizar carrito
export function changeCantidad(num) {
  return {
    type: CHANGE_CANTIDAD,
    payload: num,
  };
}

export function detailArticle(id) {
  return async function (dispatch) {
    let getArticles = await axios.get(`/articles/${id}`);
    dispatch({
      type: DETAIL_ARTICLE,
      payload: getArticles.data,
    });
  };
}

//traigo a los post
export const getPosts = () => async (dispatch) => {
  try {
    const response = await axios.get("/posts");
    const posts = response.data;
    dispatch({ type: "SET_POSTS", payload: posts });
  } catch (error) {
    console.error(error);
  }
};

//filtro para Dogs
export const fetchDogs = (age, size, sex) => async (dispatch) => {
  try {
    const response = await axios.get(
      `/dogs?age=${age}&size=${size}&sex=${sex}`
    );
    dispatch({
      type: "FETCH_DOGS_SUCCESS",
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: "FETCH_DOGS_FAILURE",
      error: error.message,
    });
  }
};

//traigo opiniones
export const getOpinions = () => async (dispatch) => {
  try {
    const response = await axios.get("/opinions");
    dispatch({
      type: "GET_OPINIONS_SUCCESS",
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: "GET_OPINIONS_FAILURE",
      payload: error.message,
    });
  }
};

//filtros para shop
export const fetchArticlesDesc = () => async (dispatch) => {
  try {
    const response = await axios.get("/articles/desc");
    dispatch({
      type: "ARTICLES_DESC_SUCCESS",
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: "ARTICLES_DESC_FAILURE",
      error: error.message,
    });
  }
};

export const ArticlesPriceAsc = () => async (dispatch) => {
  try {
    const response = await axios.get("/articles/priceasc");
    dispatch({
      type: "ARTICLES_PRICE_ASC_SUCCESS",
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: "ARTICLES_PRICE_ASC_FAILURE",
      error: error.message,
    });
  }
};

export const ArticlesPriceDesc = () => async (dispatch) => {
  try {
    const response = await axios.get("/articles/pricedesc");
    dispatch({
      type: "ARTICLES_PRICE_DESC_SUCCESS",
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: "ARTICLES_PRICE_DESC_FAILURE",
      error: error.message,
    });
  }
};

// Editar perro
export function editDog(id) {
  return async function (dispatch) {
    const response = await axios.get("/dogs/" + id);
    dispatch({
      type: EDIT_DOG,
      payload: response.data,
    });
  };
}

// tarigo referencias para el DetailDogs
export function getReferences() {
  return async function (dispatch) {
    const response = await axios.get("/references");
    dispatch({
      type: "GET_REFERENCES",
      payload: response.data,
    });
  };
}


// PARA CLOUDINARY

export const uploadImage = (formData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("images/uploadImages", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch({
        type: "UPLOAD_IMAGE_SUCCESS",
        payload: { urlImage: response.data.urlImage },
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: "UPLOAD_IMAGE_FAILURE",
        payload: { message: "Failed to upload image" },
      });
    }
  };
};





  // export const uploadImage = () => async (dispatch) => {
  //   try {
  //     const response = await axios.post("/images/uploadImages");
  //     const posts = response.data;
  //     dispatch({ type: "UPLOAD_IMAGE", payload: posts });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };