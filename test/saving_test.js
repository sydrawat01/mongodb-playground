// const mocha = require('mocha');
const assert = require('assert');

const MarioChar = require('../models/mariochar.js');

// Describe tests
describe('Saving Records', function () {
  // create tests
  it('saves record to a database', function () {
    const char = new MarioChar({
      name: 'Luigi',
      weight: 81,
    });
    // char.save(); // save it to the db to which we've connected.
    char.save().then(() => {
      assert(!char.isNew);
      done();
    });
  });

  // next test
});
