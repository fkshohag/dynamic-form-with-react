import { createStore } from 'redux';
import reducer from './redurers';
const store = createStore(reducer)
export default store