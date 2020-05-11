// const assert = require('assert');

const MarioChar = require('../models/mariochar.js');

// Describe tests
describe('Saving records', function () {
  // create tests
  it('Saves a record to the database', function (done) {
    const char = new MarioChar({
      name: 'Luigi',
      weight: 81,
    });
    char
      .save()
      .then(() => {
        // assert(!char.isNew);
        done();
      })
      .catch(err => {
        console.log('Error: ', err.message);
      });
  });

  // next test
});
