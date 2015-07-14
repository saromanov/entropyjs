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

Joint Shannon entropy
```javascript
var entropy = require('entropyjs');
console.log(entropy.jointShannon("010101", "011010")); //1.3296613488547582
```

Conditional entropy
```javascript
var entropy = require('entropyjs');
console.log(entropy.conditional("010101", "011010")); //2.4282736375228677
```

