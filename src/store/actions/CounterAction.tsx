import { StoreConstant } from "../constant/Constants"

class CounterAction {
    public static increment():any {
        return {
            type: StoreConstant.INCREMENT
        }
    }
}

export default CounterAction