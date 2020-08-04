import { applyMiddleware } from '../component/redux';

const logMiddleware = ({ getState, dispatch }) => (next) => (action) => {
  console.log('====================================');
  console.log('preState', getState());
  let result = next(action);
  console.log('nextState', getState());
  console.log('====================================');
  return result;
};
const ErrorMiddleware = ({ getState, dispatch }) => (next) => (action) => {
  try {
    return next(action);
  } catch (error) {
    console.log(error);
  }
};
const middlewares = applyMiddleware(logMiddleware, ErrorMiddleware);

export default middlewares;
