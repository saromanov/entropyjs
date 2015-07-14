
import underscore, {each, range, zip, reduce, sum} from 'underscore';
export default {
   
    //Shannon Entropy
    //H(P) = -\sum_i P(x_i) * log_2 P(x_i)
    shannon: function(items){
        let data = prepare(items);
        let result = 0;
        let count = items.length;
        for (let [ key, val ] of data.entries()){
            let probability = val/count;
            result += probability * Math.log2(probability);
        }
        return -result;
    },
    
    //Joint Shannon Entropy
    //H(P,Q) = -\sum_x\sum_y P(x,y) log_2 P(x,y)
    jointShannon: function(X, Y){
        let data1 = prepare(X);
        let data2 = prepare(Y);
        let result = 0;
        for(let [key, val] of joint_probability(X,Y)){
            result += logfunc(val, val);
        }
        return -result;
    },

    //Conditional entropy
    //H(Y|X) = \sum p(x,y)log(p(x)/p(x,y))
    conditional: function(X, Y){
        let data1 = prepare(X);
        let data2 = prepare(Y);
        let result = 0;
        for(let [key, val] of joint_probability(X,Y)){
            let probX = data1.get(key[0]);
            result += logfunc(val, probX/val);
        };
        return result;
    },

    //Cross Entropy
    //H(p,q) = H(p) + KL(p||q)
    cross: function(X, Y){
        let kl = (x, y) => {
            return reduce(range(X.length), (acc, i) => acc + x[i] * Math.log(x[i]/y[i]),0);
        }
        return this.shannon(X.toString()) + kl(norm(X), norm(Y));
    }
}

let logfunc = function(item1, item2){
   return item1 * Math.log(item2); 
}

let norm = function(X){
    let sum = reduce(X, (x,y) => x + y, 0);
    return X.map(x => x/sum);
}


//Calculation of joint probability
let joint_probability = function(X, Y){
    let len = X.length;
    let result = 0;
    X = X.split('');
    Y = Y.split('');
    let arr = [];
    var m = new Map();
    each(range(len), i => {
        let x = X[i];
        let y = Y[i];
        if(arr.filter(d => d[0] == x && d[1] == y).length == 0){
            let res = zip(X,Y).filter(v => v[0] == x && v[1] == y).length/len;
            m.set([x, y], res);
            arr.push([x,y]);
        }

    });
    return m

}

let prepare = function(items){
    items = items.split('');
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
