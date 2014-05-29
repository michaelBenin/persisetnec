# persisetnec
## A odm for leveldb

## install:
```sh
$ npm install persisetnec
```

## use:

```js
var persisetnec = require('persisetnec');

// Get us a persistence layer
var persist = persisetnec('./some-level-db-path');

// Define *some* model or other
// NOTE: The call signature MUST be an options hash!
// (this is used for restoring)
var Pony = function(opts) {
  opts = opts || {};
  this.color = opts.color || 'white';
};

Pony.prototype.neigh = function() { return 'neiiiiigh!!'; };

// Register our model with persisetnec
persist.add('Pony', Pony);

// Now you can put Ponies into your db...
var hidalgo = new Pony({ color: 'black' });
Pony.put('hidalgo', hidalgo, function(err) {
  if (err) throw err;

  // You can get Ponies too...
  Pony.get('hidalgo', function(err, hidalgo) {
    if (err) throw err;
    console.log(hidalgo.color); // black
  });
});
```

## lack of features:

* Schemas. Don't need schemas to persist, implement in another layer.
* Relationships. These may come later, or be implemented in a separate package.

## license:

MIT

