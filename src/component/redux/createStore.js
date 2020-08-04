const createStore = function (reducer, preloadedState, enhancer) {
  //
  if (typeof enhancer !== "undefined") {
    if (typeof enhancer !== "function") {
      throw new Error("Expected the enhancer to be a function.");
    }
    return enhancer(createStore)(reducer, preloadedState);
  }
  //
  if (typeof reducer !== "function") {
    throw new Error("Expected the reducer to be a function.");
  }
  //
  let currentState = preloadedState;
  let currentListeners = [];
  let currentReducer = reducer;
  //
  const getState = () => currentState;
  const subscribe = (listener) => {
    if (typeof listener !== "function") {
      throw new Error("Expected the listener to be a function.");
    }
    currentListeners.push(listener);
    return () => {
      let index = currentListeners.indexOf(listener);
      currentListeners.splice(index, 1);
    };
  };
  const dispatch = (action) => {
    if (typeof action !== "object" || action === null) {
      throw new Error("Expected the action to be a object");
    }
    if (typeof action.type === "undefined") {
      throw new Error("Expected the action has type key");
    }
    currentState = currentReducer(currentState, action);
    currentListeners.forEach((item) => item());
    // why?
    return action;
  };
  //初始化
  dispatch({
    type:
      "@@redux/INIT" +
      Math.random().toString(36).substring(7).split("").join("."),
  });
  return {
    getState,
    dispatch,
    subscribe,
  };
};
export default createStore;
