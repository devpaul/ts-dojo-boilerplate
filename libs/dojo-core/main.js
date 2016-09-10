(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './aspect', './DateObject', './encoding', './Evented', './global', './lang', './load', './on', './queue', './Registry', './request', './Scheduler', './stringExtras', './text', './UrlSearchParams', './util', './async/iteration', './async/Task', './async/timing'], factory);
    }
})(function (require, exports) {
    "use strict";
    var aspect = require('./aspect');
    exports.aspect = aspect;
    var DateObject_1 = require('./DateObject');
    exports.DateObject = DateObject_1.default;
    var encoding = require('./encoding');
    exports.encoding = encoding;
    var Evented_1 = require('./Evented');
    exports.Evented = Evented_1.default;
    var global_1 = require('./global');
    exports.global = global_1.default;
    var lang = require('./lang');
    exports.lang = lang;
    var load_1 = require('./load');
    exports.load = load_1.default;
    var on_1 = require('./on');
    exports.on = on_1.default;
    exports.emit = on_1.emit;
    var queue = require('./queue');
    exports.queue = queue;
    var Registry_1 = require('./Registry');
    exports.Registry = Registry_1.default;
    var request_1 = require('./request');
    exports.request = request_1.default;
    var Scheduler_1 = require('./Scheduler');
    exports.Scheduler = Scheduler_1.default;
    var stringExtras = require('./stringExtras');
    exports.stringExtras = stringExtras;
    var text = require('./text');
    exports.text = text;
    var UrlSearchParams_1 = require('./UrlSearchParams');
    exports.UrlSearchParams = UrlSearchParams_1.default;
    var util = require('./util');
    exports.util = util;
    var iteration = require('./async/iteration');
    var Task_1 = require('./async/Task');
    var timing = require('./async/timing');
    var async = {
        iteration: iteration,
        Task: Task_1.default,
        timing: timing
    };
    exports.async = async;
});
//# sourceMappingURL=main.js.map