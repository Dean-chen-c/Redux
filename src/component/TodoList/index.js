import { $, innerHTML } from '../../util';
import { toggleTodo } from '../../store/actions/todo';
import { getState, dispatch, subscribe } from '../../store/index';

export default function TodoLsit() {
  const list = $('list');

  list.addEventListener('click', function (e) {
    const li = e.target;
    const id = Number(li.getAttribute('data-id'));
    dispatch(toggleTodo(id));
  });

  const localStorage = window.localStorage;
  let preState = null;
  const mySubscribe = subscribe(() => {
    const { todo } = getState();
    if (preState === todo) return;
    innerHTML(list, todo);
    localStorage.setItem('list', JSON.stringify(todo));
    preState = todo;
  });
}
