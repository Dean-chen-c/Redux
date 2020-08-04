import { RED, BLUE, GREEN } from '../action-types';
export const changeColor = (color) => ({
  type: color === RED ? RED : color === BLUE ? BLUE : color === GREEN ? GREEN : '____'
});
