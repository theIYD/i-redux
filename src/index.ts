import createStore from "./store";
import {
  CreateStore,
  Dispatch,
  Middleware,
  MiddlewareAPI,
  Reducer,
  State,
  Reducers,
} from "./enum";

const combineReducers = (reducers: Reducers): Reducer => {
  return function (state, action): State {
    const globalState: State = {};
    for (const r in reducers) {
      const callReducer: State = reducers[r].call(this, state[r], action);
      globalState[r] = callReducer;
    }

    return globalState;
  };
};

const compose = (...funcs: Function[]) => {
  return function (x) {
    return funcs.reduceRight((v, f) => f(v), x);
  };
};

const applyMiddlware = (...middlewares: Middleware[]) => {
  return (createStore: CreateStore) =>
    (reducer: Reducer, preloadedState: State) => {
      const store = createStore(reducer, preloadedState);

      let dispatch: Dispatch = () => {
        throw new Error(
          "Dispatching while constructing your middleware is not allowed. " +
            "Other middleware would not be applied to this dispatch."
        );
      };

      const middlewareAPI: MiddlewareAPI = {
        getState: store.getState,
        dispatch: (action) => dispatch(action),
      };

      const middlewareChain = middlewares.map((middleware) =>
        middleware(middlewareAPI)
      );
      dispatch = compose(...middlewareChain)(store.dispatch);

      return {
        ...store,
        dispatch,
      };
    };
};

const IRedux = {
  createStore,
  combineReducers,
  compose,
  applyMiddlware,
};

export default IRedux;
