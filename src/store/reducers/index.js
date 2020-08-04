import { combineReducers } from '../../component/redux';
import todo from './todo';
import color from './color';
const rootReducer = combineReducers({ todo, color });
export default rootReducer;
