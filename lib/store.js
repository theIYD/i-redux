"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IStore = void 0;
var enum_1 = require("./enum");
var IStore = /** @class */ (function () {
    function IStore(reducer, initState) {
        var _this = this;
        this.state = {};
        this.listeners = [];
        this.reducer = null;
        this.isDispatching = false;
        // get current state
        this.getState = function () {
            if (_this.isDispatching)
                throw new Error("Cannot call store.getState while dispatching");
            return _this.state;
        };
        // listener is invoked whenever an action is dispatched
        this.subscribe = function (listener) {
            if (_this.isDispatching)
                throw new Error("Cannot call store.subscribe while dispatching");
            _this.listeners.push(listener);
            return function () {
                if (_this.isDispatching)
                    throw new Error("Cannot call store.unsubscribe while dispatching");
                var index = _this.listeners.indexOf(listener);
                _this.listeners.splice(index, 1);
            };
        };
        // used to trigger store changes i.e actions
        this.dispatch = function (action) {
            if (_this.isDispatching)
                throw new Error("Cannot call store.unsubscribe while dispatching");
            _this.isDispatching = true;
            try {
                _this.state = _this.reducer(_this.state, action);
                _this.listeners.forEach(function (listener) { return listener(); });
            }
            finally {
                _this.isDispatching = false;
            }
            return action;
        };
        // used to replace the reducer passed in constructor
        this.replaceReducer = function (reducer) {
            if (_this.isDispatching)
                throw new Error("Cannot call store.replaceReducer while dispatching");
            _this.reducer = reducer;
            return _this.reducer;
        };
        this.state = initState !== null && initState !== void 0 ? initState : {};
        this.reducer = reducer;
        // on constructing, a default init action is dispatched
        var initAction = { type: enum_1.INIT_ACTION };
        this.dispatch(initAction);
    }
    return IStore;
}());
exports.IStore = IStore;
