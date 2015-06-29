var assert = require('assert');
var entropy = require('./index.js');

describe('Test basic Shannon entropy', function(){
    it('should compute entropy', function(){
       assert(entropy.calc("abcdeabcdefj").length != 0); 
    });

    it('should compute conditional shannon entropy', function(){
        assert(entropy.jointShannon('010101','100101').length != 0);
    });
});
