import { combineReducers } from "redux";
import CounterReducer from "./counter/CounterReducer";

const reducer = combineReducers({
    counter: CounterReducer
})
export default reducer