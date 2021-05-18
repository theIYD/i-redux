// Redux API
type State = {};

interface Action {
  type: string;
  payload?: Object;
}

type Reducer = (state: State, action: Action) => State;

class IStore {
  private state: State = {};
  private listeners: Function[] = [];
  private reducer: Reducer = null;
  private isDispatching = false;

  constructor(reducer: Reducer, initState: State) {
    this.state = initState;
    this.reducer = reducer;
  }

  // get current state
  getState = () => {
    if (this.isDispatching)
      throw new Error("Cannot call store.getState while dispatching");
    return this.state;
  };

  // listener is invoked whenever an action is dispatched
  subscribe = (listener: Function) => {
    if (this.isDispatching)
      throw new Error("Cannot call store.subscribe while dispatching");

    this.listeners.push(listener);

    return () => {
      if (this.isDispatching)
        throw new Error("Cannot call store.unsubscribe while dispatching");

      const index = this.listeners.indexOf(listener);
      this.listeners.splice(index, 1);
    };
  };

  // used to trigger store changes i.e actions
  dispatch = (action: Action) => {
    if (this.isDispatching)
      throw new Error("Cannot call store.unsubscribe while dispatching");

    this.isDispatching = true;

    try {
      this.state = this.reducer(this.state, action);
      this.listeners.forEach((listener) => listener());
    } finally {
      this.isDispatching = false;
    }

    return action;
  };

  // used to replace the reducer passed in constructor
  replaceReducer = (reducer: Reducer) => {
    this.reducer = reducer;
  };
}

// DEMO

const reducer = (state: State, action: Action) => {
  return { ...state, ...action.payload };
};

const action: Action = {
  type: "CHANGE_NAME",
  payload: { name: "Huzefa" },
};

const store = new IStore(reducer, { name: "idrees" });
console.log(store.getState());
store.dispatch(action);
console.log(store.getState());
