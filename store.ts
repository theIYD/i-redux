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

  constructor(reducer: Reducer, initState: State) {
    this.state = initState;
    this.reducer = reducer;
  }

  // get current state
  getState = () => this.state;

  // listener is invoked whenever an action is dispatched
  subscribe = (listener: Function) => {
    this.listeners.push(listener);

    return () => {
      const index = this.listeners.indexOf(listener);
      this.listeners.splice(index, 1);
    };
  };

  // used to trigger store changes i.e actions
  dispatch = (action: Action) => {
    this.state = this.reducer(this.state, action);
    this.listeners.forEach((listener) => listener());

    return action;
  };
}

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
