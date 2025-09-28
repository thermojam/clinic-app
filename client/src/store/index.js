import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { userReducer } from "../reducers"
import { appointmentsReducer } from "../reducers";

const root = combineReducers({user: userReducer, appointments: appointmentsReducer});
export const store = createStore(root, applyMiddleware(thunk));
