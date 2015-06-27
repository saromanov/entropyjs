"use strict";

var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };

module.exports = {

    calc: function calc(items) {
        items = items.split("");
        var count = items.length;
        var data = counter(items);
        var result = 0;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = data.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var _step$value = _slicedToArray(_step.value, 2);

                var key = _step$value[0];
                var val = _step$value[1];

                var probability = val / count;
                result += probability * Math.log2(probability);
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

        return -result;
    } };

var prob = function prob(items, num) {
    return items.filter(function (x) {
        return x == num;
    }).length / items.length;
};

var counter = function counter(items) {
    var m = new Map();
    items.forEach(function (x) {
        if (m.get(x) == undefined) {
            m.set(x, 1);
        } else {
            m.set(x, m.get(x) + 1);
        }
    });
    return m;
};