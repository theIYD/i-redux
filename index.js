const { IStore } = require("./lib/store");

const reducer = (state, action) => {
  return { ...state, ...action.payload };
};

const action = {
  type: "CHANGE_NAME",
  payload: { name: "Doe" },
};

// Creating a store
const store = new IStore(reducer, { name: "John" });

// Get state before dispatch
console.log(store.getState());
store.dispatch(action);

// Get state after dispatch
console.log(store.getState());
