(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './lang'], factory);
    }
})(function (require, exports) {
    "use strict";
    var lang_1 = require('./lang');
    /**
     * An internal type guard that determines if an value is MapLike or not
     *
     * @param value The value to guard against
     */
    function isMapLike(value) {
        return value && typeof value.get === 'function' && typeof value.set === 'function';
    }
    /**
     * A UID for tracking advice ordering
     */
    var nextId = 0;
    /**
     * Internal function that advises a join point
     *
     * @param dispatcher The current advice dispatcher
     * @param type The type of before or after advice to apply
     * @param advice The advice to apply
     * @param receiveArguments If true, the advice will receive the arguments passed to the join point
     * @return The handle that will remove the advice
     */
    function advise(dispatcher, type, advice, receiveArguments) {
        var previous = dispatcher && dispatcher[type];
        var advised = {
            id: nextId++,
            advice: advice,
            receiveArguments: receiveArguments
        };
        if (previous) {
            if (type === 'after') {
                // add the listener to the end of the list
                // note that we had to change this loop a little bit to workaround a bizarre IE10 JIT bug
                while (previous.next && (previous = previous.next)) { }
                previous.next = advised;
                advised.previous = previous;
            }
            else {
                // add to the beginning
                if (dispatcher) {
                    dispatcher.before = advised;
                }
                advised.next = previous;
                previous.previous = advised;
            }
        }
        else {
            dispatcher && (dispatcher[type] = advised);
        }
        advice = previous = undefined;
        return lang_1.createHandle(function () {
            var _a = (advised || {}), _b = _a.previous, previous = _b === void 0 ? undefined : _b, _c = _a.next, next = _c === void 0 ? undefined : _c;
            if (dispatcher && !previous && !next) {
                dispatcher[type] = undefined;
            }
            else {
                if (previous) {
                    previous.next = next;
                }
                else {
                    dispatcher && (dispatcher[type] = next);
                }
                if (next) {
                    next.previous = previous;
                }
            }
            if (advised) {
                delete advised.advice;
            }
            dispatcher = advised = undefined;
        });
    }
    /**
     * An internal function that resolves or creates the dispatcher for a given join point
     *
     * @param target The target object or map
     * @param methodName The name of the method that the dispatcher should be resolved for
     * @return The dispatcher
     */
    function getDispatcher(target, methodName) {
        var existing = isMapLike(target) ? target.get(methodName) : target && target[methodName];
        var dispatcher;
        if (!existing || existing.target !== target) {
            /* There is no existing dispatcher, therefore we will create one */
            dispatcher = function () {
                var executionId = nextId;
                var args = arguments;
                var results;
                var before = dispatcher.before;
                while (before) {
                    if (before.advice) {
                        args = before.advice.apply(this, args) || args;
                    }
                    before = before.next;
                }
                if (dispatcher.around && dispatcher.around.advice) {
                    results = dispatcher.around.advice(this, args);
                }
                var after = dispatcher.after;
                while (after && after.id < executionId) {
                    if (after.advice) {
                        if (after.receiveArguments) {
                            var newResults = after.advice.apply(this, args);
                            results = newResults === undefined ? results : newResults;
                        }
                        else {
                            results = after.advice.call(this, results, args);
                        }
                    }
                    after = after.next;
                }
                return results;
            };
            if (isMapLike(target)) {
                target.set(methodName, dispatcher);
            }
            else {
                target && (target[methodName] = dispatcher);
            }
            if (existing) {
                dispatcher.around = {
                    advice: function (target, args) {
                        return existing.apply(target, args);
                    }
                };
            }
            dispatcher.target = target;
        }
        else {
            dispatcher = existing;
        }
        return dispatcher;
    }
    /**
     * Attaches "after" advice to be executed after the original method.
     * The advising function will receive the original method's return value and arguments object.
     * The value it returns will be returned from the method when it is called (even if the return value is undefined).
     *
     * @param target Object whose method will be aspected
     * @param methodName Name of method to aspect
     * @param advice Advising function which will receive the original method's return value and arguments object
     * @return A handle which will remove the aspect when destroy is called
     */
    function after(target, methodName, advice) {
        return advise(getDispatcher(target, methodName), 'after', advice);
    }
    exports.after = after;
    /**
     * Attaches "around" advice around the original method.
     *
     * @param target Object whose method will be aspected
     * @param methodName Name of method to aspect
     * @param advice Advising function which will receive the original function
     * @return A handle which will remove the aspect when destroy is called
     */
    function around(target, methodName, advice) {
        var dispatcher = getDispatcher(target, methodName);
        var previous = dispatcher.around;
        var advised;
        if (advice) {
            advised = advice(function () {
                if (previous && previous.advice) {
                    return previous.advice(this, arguments);
                }
            });
        }
        dispatcher.around = {
            advice: function (target, args) {
                return advised ? advised.apply(target, args) : previous && previous.advice && previous.advice(target, args);
            }
        };
        return lang_1.createHandle(function () {
            advised = dispatcher = undefined;
        });
    }
    exports.around = around;
    /**
     * Attaches "before" advice to be executed before the original method.
     *
     * @param target Object whose method will be aspected
     * @param methodName Name of method to aspect
     * @param advice Advising function which will receive the same arguments as the original, and may return new arguments
     * @return A handle which will remove the aspect when destroy is called
     */
    function before(target, methodName, advice) {
        return advise(getDispatcher(target, methodName), 'before', advice);
    }
    exports.before = before;
    /**
     * Attaches advice to be executed after the original method.
     * The advising function will receive the same arguments as the original method.
     * The value it returns will be returned from the method when it is called *unless* its return value is undefined.
     *
     * @param target Object whose method will be aspected
     * @param methodName Name of method to aspect
     * @param advice Advising function which will receive the same arguments as the original method
     * @return A handle which will remove the aspect when destroy is called
     */
    function on(target, methodName, advice) {
        return advise(getDispatcher(target, methodName), 'after', advice, true);
    }
    exports.on = on;
});
//# sourceMappingURL=aspect.js.map