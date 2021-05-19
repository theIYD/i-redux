const { IRedux } = require("./lib/index");
const { createStore, combineReducers } = IRedux;

function todos(state = [], action) {
  switch (action.type) {
    case "ADD_TODO":
      return state.concat([action.text]);
    default:
      return state;
  }
}

function counter(state = 0, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}

// Create root reducer
const rootReducer = combineReducers({
  todos,
  counter,
});

// Creating a store
const store = new createStore(rootReducer);

// Get state before dispatch
console.log(store.getState());
store.dispatch({
  type: "ADD_TODO",
  payload: "Use Redux",
});

// Get state after dispatch
console.log(store.getState());
