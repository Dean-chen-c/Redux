import { ADD_TODO, TOGGLE_TODO } from '../action-types';
let nextTodoId = 0;
const l = window.localStorage.getItem('list');
const list = l ? JSON.parse(l) : [];
nextTodoId = list.length > 0 ? list[list.length - 1].id + 1 : 1;
export const addTodo = (text) => ({
  type: ADD_TODO,
  id: nextTodoId++,
  text
});
export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  id
});
