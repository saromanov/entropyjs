"use strict";

module.exports = {

    calc: function calc(items) {
        var count = items.length;
        var total = 0;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var item = _step.value;

                item /= count;
                total += Math.exp(item);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator["return"]) {
                    _iterator["return"]();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        return -Math.log(total / count);
    },

    entropy2: function entropy2(items) {
        return -items.reduce(function (x, y) {
            return x + prob(items, y) * Math.log(prob(items, y));
        }) + 1;
    },

    shannon: function shannon(items) {
        return -items.reduce(function (x, y) {
            return x + y * Math.log(y);
        }) + 1;
    },

    conditional: function conditional(items1, items2) {}
};

var prob = function prob(items, num) {
    return items.filter(function (x) {
        return x == num;
    }).length / items.length;
};