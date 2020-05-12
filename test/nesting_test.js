const assert = require('assert');
const mongoose = require('mongoose');
const Author = require('../models/author');

// Describe our test
describe('Nesting records', function () {
  let auth;
  // hooks

  // delete the records before running the test
  before(function (done) {
    mongoose.connection.db.dropCollection('authors', () => {
      done();
    });
  });

  // Create a record with sub documents
  beforeEach(function (done) {
    auth = new Author({
      name: 'Patrick Starfish',
      books: [
        {
          title: 'Name of the Wind',
          pages: 350,
        },
      ],
    });
    auth
      .save()
      .then(() => {
        Author.findOne({ name: 'Patrick Starfish' })
          .then(record => {
            assert(record.books.length === 1);
            done();
          })
          .catch(err => {
            console.log('Error: ', err.message);
          });
      })
      .catch(err => {
        console.log('Error: ', err.message);
      });
  });

  it('Adds a new book to an author', function (done) {
    Author.findOne({ name: 'Patrick Starfish' })
      .then(record => {
        record.books.push({
          title: 'Julius Caesar',
          pages: 200,
        });
        record
          .save()
          .then(() => {
            Author.findOne({ name: 'Patrick Starfish' })
              .then(res => {
                assert(res.books.length === 2);
                done();
              })
              .catch(err => {
                console.log('Error: ', err.message);
              });
          })
          .catch(err => {
            console.log('Error: ', err.message);
          });
      })
      .catch(err => {
        console.log('Error: ', err.message);
      });
  });
});
