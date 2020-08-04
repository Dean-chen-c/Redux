import compose from './compose';

const applyMiddleware = function (...middlewares) {
  return function (createStore) {
    return function (...args) {
      let store = createStore(...args);
      let dispatch;
      let middlewareAPI = {
        getState: store.getState,
        dispatch: (...args) => dispatch(...args)
      };
      let middles = middlewares.map((middleware) => middleware(middlewareAPI));
      dispatch = compose(...middles)(store.dispatch);
      return {
        ...store,
        dispatch
      };
    };
  };
};

export default applyMiddleware;
