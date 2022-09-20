const initialState = {
    space:"",
    hour:''
}

export function schedule_reducer(state = initialState, action){
    switch(action.type){
        case "SCHEDULE":
            console.log(action.payload)
            if(action.payload.hour){
                const start_hour = parseFloat(action.payload.hour)
                const finish_hour = start_hour + 1
                return{
                    ...state,
                    space:action.payload.space,
                    hour:start_hour + ":00" + " - " + finish_hour + ":00",
                }
            }
            else
                return{
                    ...state,
                    space:action.payload.space,
                    hour:"",
                }
        default:
            return {
                ...state
            }
    }
}