import { RED, BLUE, GREEN } from '../action-types';

const color = function (state = '', action) {
  switch (action.type) {
    case RED:
      return '#ffa5a5';
    case BLUE:
      return '#cdcdff';
    case GREEN:
      return '#c9ffc9';
    default:
      return '#FFF';
  }
};
export default color;
