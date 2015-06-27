export default {
    
    calc: function(items){
        items = items.split('');
        let count = items.length;
        let data = counter(items);
        let result = 0;
        for (let [ key, val ] of data.entries()){
            let probability = val/count;
            result += probability * Math.log2(probability);
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
