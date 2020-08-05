import { $ } from '../../util';
import { RED, BLUE, GREEN } from '../../store/action-types';
import { addTodo } from '../../store/actions/todo';
import { changeColor } from '../../store/actions/color';
import { dispatch, getState, subscribe } from '../../store/index';

export default function Tool() {
  const btn = $('btn');
  const input = $('input');
  const list = $('list');

  input.addEventListener('keydown', (e) => {
    if (e.charCode === 0 && e.keyCode === 13 && input.value !== '') {
      e.preventDefault();
      dispatch(addTodo(input.value));
      input.value = '';
    }
  });

  btn.addEventListener('click', function () {
    const l = [RED, BLUE, GREEN];
    // 1-4
    const index = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
    dispatch(changeColor(l[index - 1]));
  });

  const colorSubscribe = subscribe(() => {
    const { color } = getState();
    list.style.backgroundColor = color;
  });
}
