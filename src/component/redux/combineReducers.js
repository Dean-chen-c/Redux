const combineReducers = function (reducers) {
  return function combination(state, action) {
    let newState = {};
    let hasChanged = false;
    let reducerKeys = Object.keys(reducers);
    reducerKeys.forEach((key) => {
      const preState = state[key];
      const nextState = reducers[key](preState, action);
      newState[key] = nextState;
      hasChanged = hasChanged || nextState !== preState;
    });
    return hasChanged ? newState : state;
  };
};
export default combineReducers;
