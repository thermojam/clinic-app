import {createStore, combineReducers, applyMiddleware} from "redux";
import {thunk} from "redux-thunk";
import {userReducer} from "../reducers/user-reducer.js";
import {appointmentsReducer} from "../reducers/appointments-reducer.js";

const root = combineReducers({user: userReducer, appointments: appointmentsReducer});
export const store = createStore(root, applyMiddleware(thunk));
