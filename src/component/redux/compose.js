const compose = function (...funcs) {
  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce((a, c) => {
    return (...args) => a(c(...args));
  });
};
export default compose;
