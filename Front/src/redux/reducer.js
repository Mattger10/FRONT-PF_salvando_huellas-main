import { ACCESS, SEARCH } from "./actions";

const initialState = {
  access: false,
  dogs: [],
  dogDetail: []
  onSearchDogs: [],
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


    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
