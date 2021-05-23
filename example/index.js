const { createStore, combineReducers } = require("../lib").default;

function todos(state = [], action) {
  switch (action.type) {
    case "ADD_TODO":
      return state.concat([action.payload]);
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

function logger({ getState }) {
  return (next) => (action) => {
    console.log("will dispatch", action);

    // Call the next dispatch method in the middleware chain.
    const returnValue = next(action);

    console.log("state after dispatch", getState());

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue;
  };
}

// Create root reducer
const rootReducer = combineReducers({
  todos,
  counter,
});

// Creating a store
const store = createStore(rootReducer);

// Get state before dispatch
console.log(store.getState());
store.dispatch({
  type: "ADD_TODO",
  payload: "Use Redux",
});

// Get state after dispatch
console.log(store.getState());
