const initialState = {
    path:''
}

export default function path_reducer(state = initialState, action){
    switch(action.type){
        case 'SETPATH':
            console.log("payload = ", action.payload)
            return{
                ...state,
                path:action.payload
            }
        default:
            return{
                ...state
            }
    }
}