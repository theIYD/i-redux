export type State = {};

export interface Action {
  type: string;
  payload?: Object;
}

export interface Reducers {
  [reducer: string]: Reducer;
}

export interface CreateStore {
  (reducer: Reducer, preloadedState?: State): {
    getState: () => State;
    replaceReducer: (reducer: Reducer) => Reducer;
    dispatch: (action: Action) => Action;
    subscribe: (listener: Function) => () => void;
  };
}

export interface GetState {
  (): State;
}

export interface Dispatch {
  (action: Action): Action;
}

export interface Middleware {
  (api: MiddlewareAPI): (next: Dispatch) => (action: Action) => Action;
}

export interface MiddlewareAPI {
  getState: GetState;
  dispatch: Dispatch;
}

export type Reducer = (state: State, action: Action) => State;
export const INIT_ACTION = "INIT_ACTION";
