import { ACCESS } from "./actions";

const initialState = {
  access: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACCESS:
      return {
        ...state,
        access: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
