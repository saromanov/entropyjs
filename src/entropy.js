
import underscore, {each, range} from 'underscore'
export default {
    
    calc: function(items){
        let data = prepare(items);
        let result = 0;
        let count = items.length;
        for (let [ key, val ] of data.entries()){
            let probability = val/count;
            result += probability * Math.log2(probability);
        }
        return -result;
    },

    jointShannon: function(X, Y){
        let data1 = prepare(X);
        let data2 = prepare(Y);
        let result = 0;
        for(let [key, val] of joint_probability(X,Y)){
            result += val * Math.log(val);
        }
        return -result;
    },

    conditional: function(X, Y){
        let data1 = prepare(X);
        let data2 = prepare(Y);
        let result = 0;
        for(let [key, val] of joint_probability(X,Y)){
            let probX = data1.get(key[0]);
            result += val * Math.log(probX/val);
        };
        return result;
    }
}

var joint_probability = function(X, Y){
    let len = X.length;
    let result = 0;
    X = X.split('');
    Y = Y.split('');
    var m = new Map();
    each(range(len), i => {
        let x = X[i];
        let y = Y[i];
        if(m.get((x,y)) == undefined){
            let res = X.filter(v => v == x && Y[i] == y).length/len;
            m.set([x, y], res);
        }

    });
    return m

}
var prepare = function(items){
    items = items.split('');
    return counter(items);

}

var counter = function(items){
    let m = new Map();
    items.forEach(x => {
        if(m.get(x) == undefined) {
            m.set(x, 1);
        } else {
            m.set(x, m.get(x) + 1);
        }
    });
    return m;
}
