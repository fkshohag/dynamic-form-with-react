import { StoreConstant } from "../../constant/Constants";
import { CounterState } from "../../interfaces/CounterState";

const initialState = {
    val: 0
}

const CounterReducer = (state: CounterState = initialState, action: any) => {
    switch (action.type) {
        case StoreConstant.INCREMENT:
            state.val += 2
            return state
        default:
            return state
    }
}
export default CounterReducer;