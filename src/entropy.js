export default {
    
    calc: function(items){
        let count = items.length;
        let data = counter(items);
        let result = 0;
        for (let [ key, val ] of data.entries()){
            result += (val/count) * Math.log2(val/count);
        }
        return -result;
    },
}

var prob = function(items, num){
    return items.filter(x => x == num).length/items.length;
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
