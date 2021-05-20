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
const compose = (...funcs) => {
    return function (x) {
        return funcs.reduceRight((v, f) => f(v), x);
    };
};
const IRedux = {
    createStore: IStore,
    combineReducers,
    compose,
};
export { IRedux };
