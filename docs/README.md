# Relational Data

Let's create a new model:

```text
- Authors
  - Name, Age, Books
- Books
  - Title, Pages, Genre, etc.
```

In a typical relational db, we would have two `tables` with author and book details.

But with mongodb, we do not need to do that. We can create just one `collection`, and the `relational` data can be nested inside of that.

So, here we will nest the `books` data into the `authors` collection.

```text
Authors collection:

-author-id
    -name
    -age
    -books[array]
        -book-id
            -title
            -pages
        -book-id
            -title
            -pages

-author-id
    -name
    ...
```

The above data would look something like the following in `Object` format:

```js
{
  name: 'Patrick';
  age: 38;,
  books: [
      {title: "JS for dummies", pages: 420},
      {title: "Macbeth", pages: 220}
  ]
}
```

Time to get your hands dirty! Create a new file `author.js` in `models` to create a new `schema`.

The way we nest a schema in another schema is:

[author.js]

```js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookSchema = new Schema({
  title: String,
  pages: Number,
});

const AuthorSchema = new Schema({
  name: String,
  age: Number,
  books: [BookSchema],
});

const Author = mongoose.model('author', AuthorSchema);
module.exports = Author;
```

Notice how we use the `BookSchema` to describe the structure of the `books[]` array inside the `AuthorSchema`. This is how we achieve nesting in mongodb using mongoose!

## Nesting sub documents

We'll be creating new `Authors` and nesting the `sub documents` to it. Here, we refer the data in the nested `books[]` array the sub documents.

```js
const assert = require('assert')
const Author = require('../models/author)

describe('Updating records', function(){
    it('creates author with sub documents', function(done){
        // create a new author and save to db
        let auth = new Author({
            name: 'Patrick Starfish',
            books: [{
                name: 'Gone with the wind',
                pages: 340
            }]
        })
        // save to db
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
      })
  })
})
```

![alt text](../assets/nesting-sub-docs.png 'Nesting sub documents')

We can check the same in Robo-3T as well:

![alt text](../assets/nesting-robo.png 'Nested sub docs viewed on Robo-3T')

### Adding a new sub document in a record

Suppose we wanted to add anotheer book to the author, we can do it very easily, by doing `books.push()`, as we would do in Javascript.

Before we proceed, we'll update the file for modularity.

```js
const mongoose = require('mongoose');

describe('Nesting records', function () {
  let auth;
  //hooks

  //delete db before running test
  before(function (done) {
    mongoose.connection.db.dropCollection('authors', () => {
      done();
    });
  });

  //create a new record with sub documents
  beforeEach(function (done) {
    auth = new Author({
      name: 'Patrick Starfish',
      books: [
        {
          title: 'Macbeth',
          pages: 300,
        },
      ],
    });
    //save to db
    auth
      .save()
      .then(() => {
        Author.findOne({ name: 'Patrick Starfish' })
          .then(record => {
            assert(record.books.length === 1);
          })
          .catch(err => {
            console.log('Error: ', err.message);
          });
      })
      .catch(err => {
        console.log('Error: ', err.message);
      });
  });

  it('Adds new book to an author', function (done) {
    Author.findOne({ name: 'Patrick Starfish' })
      .then(record => {
        record.books.push({
          title: 'Julius Caesar',
          pages: 240,
        });
        //save it
        record
          .save()
          .then(() => {
            Author.findOne({ name: 'Patrick Starfish' })
              .then(result => {
                assert(result.books.length === 2);
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
```

A lot of nested `then()` and `catch()` blocks, but it's still readable.

On running the tests via `npm run test`, all the tests pass.

Visualizing the data in Robo-3T, we can see two records of `books` are nested inside `author`.

![alt text](../assets/add-nested.png 'add a nested document to record')
