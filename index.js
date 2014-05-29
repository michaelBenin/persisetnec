var level = require('level'),
    mapReduce = require('map-reduce'),
    sublevel = require('sublevel');
    
module.exports = function persisetnec(p) {

  var db = level(p);

  // registered models
  db.models = Object.create(null);

  // register a model (takes a function that returns a ctor)
  db.add = function addModel(type, Model) {
    // use customized encoding/decoding for basic ODM deliciousness
    var collection = Model.collection = sublevel(db, type, {
      valueEncoding: {
        encode: function(v) {
          return JSON.stringify(v);
        },
        decode: function(v) {
          return new Model(JSON.parse(v));
        }
      }
    });

    // delicious shortcuts
    'put get del'.split(' ').forEach(function(k) {
      Model[k] = collection[k].bind(collection);
    });

    db.models[type] = Model;

    return Model;
  };

  return db;
};

