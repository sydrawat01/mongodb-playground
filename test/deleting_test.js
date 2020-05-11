// const mocha = require('mocha');
const assert = require('assert');

const MarioChar = require('../models/mariochar.js');

// Describe tests
describe('Deleting records', function () {
  // create tests
  let char;
  // hooks
  beforeEach(function (done) {
    char = new MarioChar({
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

  // findOneAndremove() record from DB test
  it('Deletes one record from db', function (done) {
    MarioChar.findOneAndRemove({ name: 'Luigi' })
      .then(() => {
        MarioChar.findOne({ name: 'Luigi' })
          .then(result => {
            assert(result === null);
            done();
          })
          .catch(err => {
            console.log('Error:', err.msg);
          });
      })
      .catch(err => {
        console.log('Error: ', err.message);
      });
  });
});
