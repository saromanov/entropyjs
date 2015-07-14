"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };

var _underscore = require("underscore");

var underscore = _interopRequire(_underscore);

var each = _underscore.each;
var range = _underscore.range;
var zip = _underscore.zip;
var reduce = _underscore.reduce;
module.exports = {

    //Shannon Entropy
    //H(P) = -\sum_i P(x_i) * log_2 P(x_i)
    shannon: function shannon(items) {
        var data = prepare(items);
        var result = 0;
        var count = items.length;
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
    },

    //Joint Shannon Entropy
    //H(P,Q) = -\sum_x\sum_y P(x,y) log_2 P(x,y)
    jointShannon: function jointShannon(X, Y) {
        var data1 = prepare(X);
        var data2 = prepare(Y);
        var result = 0;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = joint_probability(X, Y)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var _step$value = _slicedToArray(_step.value, 2);

                var key = _step$value[0];
                var val = _step$value[1];

                //result += val * Math.log(val);
                result += logfunc(val, val);
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
    },

    //Conditional entropy
    //H(Y|X) = \sum p(x,y)log(p(x)/p(x,y))
    conditional: function conditional(X, Y) {
        var data1 = prepare(X);
        var data2 = prepare(Y);
        var result = 0;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = joint_probability(X, Y)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var _step$value = _slicedToArray(_step.value, 2);

                var key = _step$value[0];
                var val = _step$value[1];

                var probX = data1.get(key[0]);
                //result += val * Math.log(probX/val);
                result += logfunc(val, probX / val);
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

        ;
        return result;
    },

    //Cross Entropy
    //H(p,q) = H(p) + KL(p||q)
    cross: function cross(X, Y) {
        var kl = function (x, y) {
            return reduce(range(X.length), function (acc, i) {
                return acc + x[i] * Math.log(x[i] / y[i]);
            }, 0);
        };
        return this.shannon(X.toString()) + kl(norm(X), norm(Y));
    }
};

var logfunc = function logfunc(item1, item2) {
    return item1 * Math.log(item2);
};

var norm = function norm(X) {
    var sum = X.reduce(function (x, y) {
        return x + y;
    }, 0);
    return X.map(function (x) {
        return x / sum;
    });
};
var joint_probability = function joint_probability(X, Y) {
    var len = X.length;
    var result = 0;
    X = X.split("");
    Y = Y.split("");
    var arr = [];
    var m = new Map();
    each(range(len), function (i) {
        var x = X[i];
        var y = Y[i];
        if (arr.filter(function (d) {
            return d[0] == x && d[1] == y;
        }).length == 0) {
            var res = zip(X, Y).filter(function (v) {
                return v[0] == x && v[1] == y;
            }).length / len;
            m.set([x, y], res);
            arr.push([x, y]);
        }
    });
    return m;
};

var prepare = function prepare(items) {
    items = items.split("");
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