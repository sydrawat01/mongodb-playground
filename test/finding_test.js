// const mocha = require('mocha');
const assert = require('assert');

const MarioChar = require('../models/mariochar.js');

// Describe tests
describe('Finding records', function () {
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

  // findOne() test
  it('Find one record from the database', function (done) {
    MarioChar.findOne({ name: 'Luigi' })
      .then(result => {
        assert(result.name === 'Luigi');
        done();
      })
      .catch(err => {
        console.log('Error: ', err.message);
      });
  });

  // findOne() record by ID from DB test
  it('Find one record from the database using ID', function (done) {
    MarioChar.findOne({ _id: char._id })
      .then(result => {
        assert(result._id.toString() === char._id.toString());
        done();
      })
      .catch(err => {
        console.log('Error: ', err.message);
      });
  });
});
