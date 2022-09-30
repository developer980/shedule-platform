import { createStore } from "redux";
import date_reducer from "./date/date-reducer";
import { schedule_reducer } from "./schedule-reducer/schedule_reducer";
import { space_reducer } from "./spaces/space_reducer";
import path_reducer from "./path/reducer";
import { combineReducers } from "redux";

const reducers = combineReducers({
    date_reducer,
    schedule_reducer,
    space_reducer,
    path_reducer
})

const store = createStore(reducers)

export default store;