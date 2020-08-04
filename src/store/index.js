import { createStore } from '../component/redux';
import rootReducer from './reducers';
import middlewares from './middleware';

const l = window.localStorage.getItem('list');
const defaultState = { todo: l ? JSON.parse(l) : [], color: '' };

const store = createStore(rootReducer, defaultState, middlewares);
const { getState, dispatch, subscribe } = store;
export { getState, dispatch, subscribe };
