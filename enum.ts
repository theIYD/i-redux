import { IStore } from "./store";

// Redux API
export type State = {};

export interface Action {
  type: string;
  payload?: Object;
}

export interface CreateStore {
  (reducer: Reducer, preloadedState?: State): IStore;
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
