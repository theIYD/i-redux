// Redux API
export type State = {};

export interface Action {
  type: string;
  payload?: Object;
}

export type Reducer = (state: State, action: Action) => State;
export const INIT_ACTION = "INIT_ACTION";
