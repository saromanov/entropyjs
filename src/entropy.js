export default {
    
    calc: function(items){
        let count = items.length;
        let total = 0;
        for(let item of items){
            item /= count;
            total += Math.exp(item);
        }

        return -Math.log(total/count);
    },

    entropy2: function(items){
        return -items.reduce((x,y) => x + prob(items, y) * Math.log(prob(items,y)))+1;
    },

    shannon: function(items){
        return -items.reduce((x,y) => x + (y * Math.log(y)))+1;
    }


}

var prob = function(items, num){
    return items.filter(x => x == num).length/items.length;
}

