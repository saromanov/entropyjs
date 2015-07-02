# entropyjs [![Build Status](https://travis-ci.org/saromanov/entropyjs.svg?branch=master)](https://travis-ci.org/saromanov/entropyjs)


## Usage
```javascript
var entropy = require('entropyjs');
console.log(entropy.calc("abcdeabcdefj"));
//2.7516291673878226
```

Cross Entropy
```javascript
var entropy = require('entropyjs');
console.log(entropy.cross([1,2,1,2,1,2], [1,1,1,1,1,1]))
//1.5961177691966342
```

