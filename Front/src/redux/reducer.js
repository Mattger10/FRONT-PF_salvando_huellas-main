import { ACCESS } from "./actions";

const initialState = {
  access: false,
  dogs: [],
};

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

    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
