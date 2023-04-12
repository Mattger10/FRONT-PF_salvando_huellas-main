import { EJEMPLOTYPE } from "./actions";

const initialState = {
    ejemplo: false
};

const rootReducer = (state = initialState, action) => {
    switch (action.type){

        case EJEMPLOTYPE:
        console.log("ejemplo")
        return {
            ...state,
            ejemplo: true
        }

        default:
            return {
                ...state
            }
    }
}

export default rootReducer;