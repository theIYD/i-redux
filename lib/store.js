var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _state, _listeners, _reducer, _isDispatching;
import { INIT_ACTION } from "./enum";
class IStore {
    constructor(reducer, initState) {
        _state.set(this, {});
        _listeners.set(this, []);
        _reducer.set(this, null);
        _isDispatching.set(this, false);
        // get current state
        this.getState = () => {
            if (__classPrivateFieldGet(this, _isDispatching))
                throw new Error("Cannot call store.getState while dispatching");
            return __classPrivateFieldGet(this, _state);
        };
        // listener is invoked whenever an action is dispatched
        this.subscribe = (listener) => {
            if (__classPrivateFieldGet(this, _isDispatching))
                throw new Error("Cannot call store.subscribe while dispatching");
            __classPrivateFieldGet(this, _listeners).push(listener);
            return () => {
                if (__classPrivateFieldGet(this, _isDispatching))
                    throw new Error("Cannot call store.unsubscribe while dispatching");
                const index = __classPrivateFieldGet(this, _listeners).indexOf(listener);
                __classPrivateFieldGet(this, _listeners).splice(index, 1);
            };
        };
        // used to trigger store changes i.e actions
        this.dispatch = (action) => {
            if (__classPrivateFieldGet(this, _isDispatching))
                throw new Error("Cannot call store.unsubscribe while dispatching");
            __classPrivateFieldSet(this, _isDispatching, true);
            try {
                __classPrivateFieldSet(this, _state, __classPrivateFieldGet(this, _reducer).call(this, __classPrivateFieldGet(this, _state), action));
                __classPrivateFieldGet(this, _listeners).forEach((listener) => listener());
            }
            finally {
                __classPrivateFieldSet(this, _isDispatching, false);
            }
            return action;
        };
        // used to replace the reducer passed in constructor
        this.replaceReducer = (reducer) => {
            if (__classPrivateFieldGet(this, _isDispatching))
                throw new Error("Cannot call store.replaceReducer while dispatching");
            __classPrivateFieldSet(this, _reducer, reducer);
            return __classPrivateFieldGet(this, _reducer);
        };
        __classPrivateFieldSet(this, _state, initState !== null && initState !== void 0 ? initState : {});
        __classPrivateFieldSet(this, _reducer, reducer);
        // on constructing, a default init action is dispatched
        const initAction = { type: INIT_ACTION };
        this.dispatch(initAction);
    }
}
_state = new WeakMap(), _listeners = new WeakMap(), _reducer = new WeakMap(), _isDispatching = new WeakMap();
export { IStore };
