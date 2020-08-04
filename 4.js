let nextTodoId = 0;
// TYPE
const ADD_TODO = "ADD_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const RED = "RED";
const BLUE = "BLUE";
const GREEN = "GREEN";
// ACTION CREATOR
const addTodo = (text) => ({
  type: ADD_TODO,
  id: nextTodoId++,
  text,
});
const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  id,
});
const changeColor = (color) => ({
  type:
    color === RED
      ? RED
      : color === BLUE
      ? BLUE
      : color === GREEN
      ? GREEN
      : "____",
});
// REDUCER
const todo = function (state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [...state, { id: action.id, text: action.text, completed: false }];
    case TOGGLE_TODO:
      return state.map((i) =>
        i.id === action.id ? { ...i, completed: !i.completed } : i
      );
    default:
      return state;
  }
};
const color = function (state = "", action) {
  switch (action.type) {
    case RED:
      return "#f00";
    case BLUE:
      return "#00F";
    case GREEN:
      return "#0F0";
    default:
      return "#FFF";
  }
};
const logMiddleware = ({ getState, dispatch }) => (next) => (action) => {
  console.log("====================================");
  console.log("preState", getState());
  let result = next(action);
  console.log("nextState", getState());
  console.log("====================================");
  return result;
};
const ErrorMiddleware = ({ getState, dispatch }) => (next) => (action) => {
  try {
    return next(action);
  } catch (error) {
    console.log(error);
  }
};
const rootReducer = combineReducers({ todo, color });
const middlewares = applymiddleware(logMiddleware, ErrorMiddleware);
const l = window.localStorage.getItem("list");
const defaultState = { todo: l ? JSON.parse(l) : [], color: "" };
nextTodoId =
  defaultState.todo.length > 0
    ? defaultState.todo[defaultState.todo.length - 1].id + 1
    : 1;
const store = createStore(rootReducer, defaultState, middlewares);
const { getState, dispatch, subscribe } = store;

const $ = function (id) {
  return document.getElementById(id);
};
const input = $("input");
const list = $("list");
const btn = $("btn");
input.addEventListener("keydown", (e) => {
  if (e.charCode === 0 && e.keyCode === 13) {
    e.preventDefault();
    dispatch(addTodo(input.value));
    input.value = "";
  }
});
list.addEventListener("click", function (e) {
  const li = e.target;
  const id = Number(li.getAttribute("data-id"));
  dispatch(toggleTodo(id));
});
btn.addEventListener("click", function () {
  const l = [RED, BLUE, GREEN];
  // 1-4
  const index = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
  dispatch(changeColor(l[index - 1]));
});

const template = function (list) {
  return list.map((i) => {
    return `<li data-id='${i.id}' style='text-decoration:${
      i.completed ? "line-through" : "none"
    }'>${i.text}</li>`;
  });
};
const innerHTML = function (state) {
  const str = template(state).join("");
  list.innerHTML = str;
};
innerHTML(defaultState.todo);

const localStorage = window.localStorage;
let preState = null;
const mySubscribe = subscribe(() => {
  const { todo } = getState();
  if (preState === todo) return;
  innerHTML(todo);
  localStorage.setItem("list", JSON.stringify(todo));
  preState = todo;
});
const colorSubscribe = subscribe(() => {
  const { color } = getState();
  list.style.backgroundColor = color;
});

// function fun() {
//   function _(type) {
//     while (1) {
//       switch (type) {
//         case 1:
//           return 1;
//         case 2:
//           return 2;
//         default:
//           return 0;
//       }
//     }
//   }
//   return { next: _ };
// }
// const b = fun();
