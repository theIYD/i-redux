"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var store_1 = require("./store");
var combineReducers = function (reducers) {
    return function (state, action) {
        var globalState = {};
        for (var r in reducers) {
            var callReducer = reducers[r].call(this, state[r], action);
            globalState[r] = callReducer;
        }
        return globalState;
    };
};
var compose = function () {
    var funcs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        funcs[_i] = arguments[_i];
    }
    return function (x) {
        return funcs.reduceRight(function (v, f) { return f(v); }, x);
    };
};
var applyMiddleware = function () {
    var middlewares = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        middlewares[_i] = arguments[_i];
    }
    return function (createStore) {
        return function (reducer, preloadedState) {
            var store = createStore(reducer, preloadedState);
            var dispatch = function () {
                throw new Error("Dispatching while constructing your middleware is not allowed. " +
                    "Other middleware would not be applied to this dispatch.");
            };
            var middlewareAPI = {
                getState: store.getState,
                dispatch: function (action) { return dispatch(action); },
            };
            var middlewareChain = middlewares.map(function (middleware) {
                return middleware(middlewareAPI);
            });
            dispatch = compose.apply(void 0, middlewareChain)(store.dispatch);
            return __assign(__assign({}, store), { dispatch: dispatch });
        };
    };
};
var IRedux = {
    createStore: store_1.default,
    combineReducers: combineReducers,
    compose: compose,
    applyMiddleware: applyMiddleware,
};
exports.default = IRedux;
