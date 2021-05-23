"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enum_1 = require("./enum");
var createStore = function (reducer, initState) {
    var state = initState !== null && initState !== void 0 ? initState : {};
    var storeReducer = reducer;
    var isDispatching = false;
    var listeners = [];
    // get current state
    var getState = function () {
        if (isDispatching)
            throw new Error("Cannot call store.getState while dispatching");
        return state;
    };
    // listener is invoked whenever an action is dispatched
    var subscribe = function (listener) {
        if (isDispatching)
            throw new Error("Cannot call store.subscribe while dispatching");
        listeners.push(listener);
        return function () {
            if (isDispatching)
                throw new Error("Cannot call store.unsubscribe while dispatching");
            var index = listeners.indexOf(listener);
            listeners.splice(index, 1);
        };
    };
    // used to trigger store changes i.e actions
    var dispatch = function (action) {
        if (isDispatching)
            throw new Error("Cannot call store.unsubscribe while dispatching");
        isDispatching = true;
        try {
            state = storeReducer(state, action);
            listeners.forEach(function (listener) { return listener(); });
        }
        finally {
            isDispatching = false;
        }
        return action;
    };
    // used to replace the reducer passed in constructor
    var replaceReducer = function (reducer) {
        if (isDispatching)
            throw new Error("Cannot call store.replaceReducer while dispatching");
        reducer = reducer;
        return reducer;
    };
    // a default init action is dispatched
    var initAction = { type: enum_1.INIT_ACTION };
    dispatch(initAction);
    return {
        getState: getState,
        replaceReducer: replaceReducer,
        dispatch: dispatch,
        subscribe: subscribe,
    };
};
exports.default = createStore;
