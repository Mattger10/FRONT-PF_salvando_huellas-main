// Action types

export const EJEMPLOTYPE = "EJEMPLOTYPE"

// Actions

export function actionEjemplo(data){
    return{
        type: EJEMPLOTYPE,
        payload: data
    }
}