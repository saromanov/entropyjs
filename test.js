var assert = require('assert');
var entropy = require('./index.js');

describe('Test basic Shannon entropy', function(){
    it('should compute entropy', function(){
       assert(entropy.shannon("abcdeabcdefj").length != 0); 
    });

    it('should compute conditional shannon entropy', function(){
        assert(entropy.jointShannon('010101','100101').length != 0);
    });
});


describe('Test cross entropy', function(){
    it('should compute conditional entropy', function(){
        assert(entropy.cross([1,1,2],[1,1,3]).length != 0);
    });
});
