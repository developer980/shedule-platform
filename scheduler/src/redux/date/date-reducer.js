const initialState = {
    date:''
}

export default function date_reducer(state = initialState, action) {
    switch(action.type){
        case 'setDate':
            console.log(action.payload)
            return{
                ...state,
                date:action.payload
            }
        default:
            return{
                ...state
            }
    }
}