var scuttleify = require('level-scuttlebutt'),
    Model = require('scuttlebutt/model'),
    udid = require('udid');

module.exports = function (db) {
  var scuttles = db.sublevel('scuttlebutt'),
      factories = {},
      persistence = {};

  //
  // Route factories by name
  //
  scuttleify(scuttles, udid('webmaster'), function create(name) {
    return factories[name]? factories[name]() : new Model();
  });

  persistence.scuttles = scuttles;
  persistence.open = function open(name, cb) {
    return persistence.scuttles.open(name, cb);
  };

  persistence.enable = function persist(name, factory) {
    factories[name] = factory;
    factory.attach = function (instance) {
      instance.open = function (cb) {
        open(name, function (err, scuttle) {
          if (err) return cb(err);
          instance[name] = scuttle;
          cb(null, scuttle);
        });
      };
      return instance;
    };
    return factory;
  });

  return persistence;
};

