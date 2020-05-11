// const mocha = require('mocha');
const assert = require('assert');

const MarioChar = require('../models/mariochar.js');

// Describe tests
describe('Updating records', function () {
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

  // findOneAndUpdate() record from DB test
  it('Update one record in the db', function (done) {
    MarioChar.findOneAndUpdate({ name: 'Luigi' }, { name: 'Princess Peach', weight: 51 })
      .then(() => {
        MarioChar.findOne({ _id: char._id })
          .then(result => {
            assert(result.name === 'Princess Peach');
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

  // Increment weight by 1
  it('Increments weight by 1', function (done) {
    MarioChar.updateMany({}, { $inc: { weight: +1 } })
      .then(() => {
        MarioChar.findOne({ _id: char._id })
          .then(result => {
            assert(result.weight === 82);
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
