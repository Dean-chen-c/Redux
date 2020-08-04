const bindActionCreator = function (actionCreator, dispatch) {
  return function (...args) {
    return dispatch(actionCreator(...args));
  };
};
const bindActionCreators = function (actionCreators, dispatch) {
  if (typeof actionCreators === "function") {
    return bindActionCreator(actionCreators, dispatch);
  }
  let boundActionCreators = {};
  for (let key in actionCreators) {
    if ({}.hasOwnProperty.call(actionCreators, key)) {
      let actionCreator = actionCreators[key];
      if (typeof actionCreator === "function") {
        boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
      }
    }
  }
  return boundActionCreators;
};
export default bindActionCreators;
