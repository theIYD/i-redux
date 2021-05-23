import { Reducer, Action, State, INIT_ACTION } from "./enum";

const createStore = (reducer: Reducer, initState?: State, enhancer?) => {
  let state: State = initState ?? {};
  const storeReducer: Reducer = reducer;
  let isDispatching = false;
  const listeners: Function[] = [];

  // get current state
  const getState = () => {
    if (isDispatching)
      throw new Error("Cannot call store.getState while dispatching");
    return state;
  };

  // listener is invoked whenever an action is dispatched
  const subscribe = (listener: Function) => {
    if (isDispatching)
      throw new Error("Cannot call store.subscribe while dispatching");

    listeners.push(listener);

    return () => {
      if (isDispatching)
        throw new Error("Cannot call store.unsubscribe while dispatching");

      const index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
  };

  // used to trigger store changes i.e actions
  const dispatch = (action: Action) => {
    if (isDispatching)
      throw new Error("Cannot call store.unsubscribe while dispatching");

    isDispatching = true;

    try {
      state = storeReducer(state, action);
      listeners.forEach((listener) => listener());
    } finally {
      isDispatching = false;
    }

    return action;
  };

  // used to replace the reducer passed in constructor
  const replaceReducer = (reducer: Reducer) => {
    if (isDispatching)
      throw new Error("Cannot call store.replaceReducer while dispatching");

    reducer = reducer;
    return reducer;
  };

  if (!!enhancer) {
    return enhancer(createStore)(reducer, initState);
  }

  // a default init action is dispatched
  const initAction = { type: INIT_ACTION };
  dispatch(initAction);

  return {
    getState,
    replaceReducer,
    dispatch,
    subscribe,
  };
};

export default createStore;
