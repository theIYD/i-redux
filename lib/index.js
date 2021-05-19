import { IStore } from "./store";
const combineReducers = (reducers) => {
    return function (state, action) {
        const globalState = {};
        for (const r in reducers) {
            const callReducer = reducers[r].call(this, state[r], action);
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
