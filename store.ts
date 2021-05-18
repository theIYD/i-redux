// Redux API
type State = {};

interface Action {
  type: string;
  payload?: Object;
}

type Reducer = (state: State, action: Action) => State;
const INIT_ACTION = "INIT_ACTION";

class IStore {
  #state: State = {};
  #listeners: Function[] = [];
  #reducer: Reducer = null;
  #isDispatching = false;

  constructor(reducer: Reducer, initState: State) {
    this.#state = initState;
    this.#reducer = reducer;

    // on constructing, a default init action is dispatched
    const initAction = { type: INIT_ACTION };
    this.dispatch(initAction);
  }

  // get current state
  getState = () => {
    if (this.#isDispatching)
      throw new Error("Cannot call store.getState while dispatching");
    return this.#state;
  };

  // listener is invoked whenever an action is dispatched
  subscribe = (listener: Function) => {
    if (this.#isDispatching)
      throw new Error("Cannot call store.subscribe while dispatching");

    this.#listeners.push(listener);

    return () => {
      if (this.#isDispatching)
        throw new Error("Cannot call store.unsubscribe while dispatching");

      const index = this.#listeners.indexOf(listener);
      this.#listeners.splice(index, 1);
    };
  };

  // used to trigger store changes i.e actions
  dispatch = (action: Action) => {
    if (this.#isDispatching)
      throw new Error("Cannot call store.unsubscribe while dispatching");

    this.#isDispatching = true;

    try {
      this.#state = this.#reducer(this.#state, action);
      this.#listeners.forEach((listener) => listener());
    } finally {
      this.#isDispatching = false;
    }

    return action;
  };

  // used to replace the reducer passed in constructor
  replaceReducer = (reducer: Reducer) => {
    if (this.#isDispatching)
      throw new Error("Cannot call store.replaceReducer while dispatching");

    this.#reducer = reducer;
    return this.#reducer;
  };
}

export { IStore };
