var persisetnec = require('../index'),
    expect = require('chai').expect;

describe('persisetnec', function() {
  var persist;
  it('should create a db', function() {
    persist = persisetnec('./test-db');
    expect(persist).to.exist;
    expect(persist.models).to.exist;
  });

  it('should allow for defining models', function() {
    var Pony = function(opts) {
      this.color = opts && opts.color || 'white';
    };
    Pony.prototype.neigh = function() {
      return 'neiiiiigh!!';
    };

    expect(function () {
      persist.add('Pony', Pony);
    }).to.not.throw()

    expect(persist.models.Pony).to.exist;
  });

  it('should let us save a model', function(done) {
    var Pony = persist.models.Pony;
    var hidalgo = new Pony({ color: 'black' });
    expect(hidalgo.color).to.equal('black');

    Pony.put('hidalgo', hidalgo, done);
  });

  it('should let us get the model', function(done) {
    persist.models.Pony.get('hidalgo', function(err, hidalgo) {
      if (err) return done(err);
      expect(hidalgo).to.exist;
      expect(hidalgo.color).to.equal('black');
      done();
    });
  });

});
