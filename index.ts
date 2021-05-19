import { IStore } from "./store";
import { Reducer, State } from "./enum";

interface Reducers {
  [reducer: string]: Reducer;
}

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

const IRedux = {
  createStore: IStore,
  combineReducers,
};

export { IRedux };
