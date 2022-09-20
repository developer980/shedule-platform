const initialState = {
    spaces:[]
}

export function space_reducer(state = initialState, action){
    switch(action.type){
        case "GET_SPACES":
            console.log(action.payload)
            return{
                ...state,
                spaces:action.payload
            }
        default:
            return {
                ...state
            }
    }
}