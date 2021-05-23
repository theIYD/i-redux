import createStore from "./store";
import {
  CreateStore,
  Dispatch,
  Middleware,
  MiddlewareAPI,
  Reducer,
  State,
  Reducers,
  ActionCreatorObject,
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

function bindActionCreator(actionCreator: Function, dispatch: Dispatch) {
  return function (this: any, ...args: any[]) {
    return dispatch(actionCreator.apply(this, args));
  };
}

const applyMiddleware = (...middlewares: Middleware[]) => {
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

const bindActionCreators = (
  actionCreators: Function | ActionCreatorObject,
  dispatch: Dispatch
) => {
  if (typeof actionCreators === "function") {
    return bindActionCreator(actionCreators, dispatch);
  }

  const creators = {};
  for (let key in actionCreators) {
    const actionCreator = actionCreators[key];

    if (typeof actionCreator === "function") {
      creators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }

  return creators;
};

const IRedux = {
  createStore,
  combineReducers,
  compose,
  applyMiddleware,
  bindActionCreators,
};

export default IRedux;
