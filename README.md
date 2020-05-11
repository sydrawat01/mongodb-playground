# MongoDB

In this project, I'll be practicing working on MongoDB.

For installation instructions on MacOS, please follow [this guide](https://github.com/sydrawat/graphql-playlist/blob/master/server/docs/mongoDB.md).

Once the installation is complete, we need to run the `mongod` instance to start connection with a local db.

To start mongodb:

`brew services start mongodb-community`

Verify that **mongod** is running, check:

`ps aux | grep -v grep | grep mongod`

## Install project dependencies

Install `mongoose` as a dependency in your project.

`npm i -S mongoose`

Add `nodemon` as a dev dependency:

`npm i -D nodemon`

Create a script in `package.json` to run the nodemon script on `connection.js` in `test/`:

```json
  "scripts": {
    "dev": "./node_modules/.bin/nodemon ./test/connection"
  },
```

## Connecting to local db

In the `connection.js` file, connect to the mongodb in the following way:

```js
const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost:27017/testdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected to local db!');
  })
  .catch(err => {
    console.log('Error:', err.message);
  });
```

If you do not have a db created, the connection string will create one for you. Notice the `mongodb://localhost:27017/testdb` string? The `testdb` is the local db that is not created yet, but this connection string will create a db called `testdb` without requiring you to worry about creating a local db manually.

Another thing that is important is using the new `conect()` method. The older methods are noe deprecated, and now the connection string requires you to add two important parameters as well while connecting to any local or remote db:

```js
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
```

## Models and Collections

In MongoDB, we can habe multiple databases running at once. In each database, we can have mulitple collections to begin with.
Each of these collections can have different models respectively. Each record of the collection of the database is based on a schema.

There is a schema, which tells the model in the collection that what kind of data does it have. Every model has a unique schema realted to that model.

Let's see what I'm talking about in terms of code:

- Create a new folder named `models/`. We'll add our `Collections` inside this folder.

- Create a file called `mariochar.js`. This will have the schema and model for creating a new Mario Character.

- In `marichar.js`:

```js
const mongoose = require('mongoose');

const { Schema } = mongoose;

// create schema
const MarioCharSchema = new Schema({
  name: String,
  weight: Number,
});

// create model
const MarioChar = mongoose.model('mariochar', MarioCharSchema);
```

The `//create schema` code will create a new schema for the `mariochar` model based on the `MarioCharSchema`.

So, everytime a user creates a new `MarioChar`, we're going to create it in `mariochar` collection, and `mongoose.model()` it based on the `MarioCharSchema`.

## Intro to Mocha

Mocha is a testing framework, used to perform tests within our appication to make sure everything works correctly.

In our project, we'll be using `Mocha` to test our connection with the mongo database for the basic CRUD operations.

What are CRUD operations? Well:

- **C**reate record
- **R**ead record
- **U**pdate record
- **D**elete record

### Installing Mocha

Use `npm` to install `Mocha`:

`npm i -S mocha`

Remember, we had made a `test/` folder, so this is where we'll be adding all out test scripts in Mocha.
Let's start by creating a `demo_test.js`.

> NOTE: You don't need to require `mocha` in this file, it'll work regardless of that.

### Creating tests

We need to describe what our tests will be like in this file. We'll use the `describe()` method, which takes two parameters:

- First param : `String`, which describes the test within it, and

- Second param : `function`, where all the tests occur.

This is what I'm talking about:

```js
// Describe tests
describe('some demo tests', function () {
  // create tests
});
```

The `it()` function describes one test.

```js
// Describe tests
describe('some demo tests', function () {
  // create tests
  it('add two numbers together', function () {
    assert(2 + 3 === 5);
  });
});
```

If the `assert()` evaluates to `true`, then the test `it()`, `passes`. Else, it evaluates to `false` and the test `fails`.
To use `assert()` as above, we need to `require()` it:

```js
const assert = require('assert');
```

To run this test, we can issue the command `npm run test`. But before we can give this command, we would need to set-up the `test` script in our `package.json` file.

```json
  "scripts": {
    "test": "mocha test/*_test.js",
  }
```

Once this is done, run `npm run test` from the terminal :

![alt text](assets/demotest.png 'demo test assert() true')

In case we `assert()` to a `false` value, we get this result:

```js
assert(2 + 3 === 6);
```

![alt text](assets/demofail.png 'points to which test has failed')

## Saving data to MongoDB

We'll test adding data to our local db using the `test/` folder. I've renamed the `demo_test.js` file to `saving_test.js` to test saving of the new `MarioChar` to our local db.

```js
const { MarioChar } = require('../models/mariochar');

describe('save records', function () {
  it('saves a record to the db', function () {
    let char = new MarioChar({
      name: 'Luigi',
      weight: 82, // can skip this if we want
    });
    char.save(); // saves it to the local db to which we connected previously
  });
});
```

We need to`assert()` that the `save()` is successful, but we **CANNOT** do something like this:

```js
assert(char.save());
```

This is beacuse `save()` is an **asynchronous** function. So we have to wait for `save()` to finish.

So, mongoose knows that `save()` is an async request, it implements the `promise` interface for us.

This lets us do the following:

```js
char.save().then(() => {
  // assert(char.isNew === false);
  assert(!char.isNew);
  done();
});
```

The `char.isNew` returns `true` when we've created the `char` locally but not saved in the local db. It returns `false` when the `char` has been created and save to local db as well.

So here, we're checking this for `false` to verify that the new `char` is created and successfully saved into the local db as well.

Mocha needs to know when we've completed our test. It does not know that automatically know when the `char` is saved. To do that, we add `done()` telling Mocha we're done with the current test and it can move on to the other tests.

![alt text](assets/save.png 'save the new char to the local db')

## [Robo-3T](https://robomongo.org)

Robo-3T was previously known as Robomongo.

Install Robo-3T using `homebrew` on MacOS:

`homebrew cask install robo-3t`

After the installation is complete, run the Robo-3T app, and create a new connection with the default settings in-palce.

Connect to this new connection, and on the left hand pane, we can see all the databases on our system ,including the one we created using this project!

![alt text](assets/robo-3t.png 'list of dbs on robo-3t')

On double-clicking the `Collections` : `marichar`, we can see a lot of records laready in the collection. This is because the number of times we ran `npm run test`, we added a new record of `char` and used `save()` to save it to our `testaroo` db. Mongo assigns a unique ID to the object we add into the collection each time. Hence there are so many entries in the `marichar` collecion.

![alt text](assets/mariochar.png 'data in the collection marichar')

## Dropping a collection before each test

We need to delete the data for `mariochar` collection whenever we run the `saving_test.js` file. Since everytime we run the file, we create a new `char` of `mariochar` collection, and monogodb creates a new entry into the db with a unique ID.

So everytime we run the tesst to `save()` an entry into a collection, we need to drop the data inside that collection, or to simply say: drop the collection.

Here's how we do it:
[connection.js]

```js
// drop the characters collection before each test
beforeEach(function () {
  //drop the collection
  mongoose.connection.db.dropCollection('mariochars', () => {
    done();
  });
});
```

Notice how we user `mariochars`, **[plural]**, to point to the specific collection. Mongo usually _pluralizes_ our model (collection here), because it assumes we'll have more than one record in it, so it makes sense to pluralize.

Remember, `drop()` is an asynchronous request as well. So we'll add the `done()` function to indicate that the test has been complete to notify mongodb.

Now when we run `npm run test`, we can see on the Robo-3T app that our collection `mariochars` has only one entry each time wee run the test. So ideally `beforeEach()` will drop the collection `mariochars` before anything can be saved again into that collection.

The `beforeEach()` hook will run before any of the test suites are run, so here in our case, the `saving_test.js` file has a test suite `Saving records`, which will run after the `mariochars` collection is dropped, hence giving us the desired functionality.

## Finding Records

We'll be focusing on two methods:

- `find(criteria)`

- `findOne(criteria)`

The names are self explanatory, but just in case you're wondering, `find()` will return all the records with the specified `criteria`, whereas `findOne()` will return only one, first instance of the records that meets the specified `criteria`.

These functions a re different from `save()`, since these functions work on the model itself, whereas the `save()` works on the instance of that model.

Didn't understand? Let's see:

- The `save()` method was on a single instance:

  ```js
  myChar = new MarioChar({
    name: 'Luigi',
  });
  myChar.save();
  ```

- The `find()` methods are on the model:

  ```js
  MarioChar.find({
    name: 'Luigi',
  });
  ```

We'll start by creating a file for testing the `find()` methods on our model `MarioChar`:

`finding_test.js`

```js
const assert = require('assert');

const MarioChar = require('../models/mariochar.js');

// Describe tests
describe('Finding records', function () {
  // create tests

  // hooks
  beforeEach(function (done) {
    const char = new MarioChar({
      name: 'Luigi',
      weight: 81,
    });
    char
      .save()
      .then(() => {
        assert(!char.isNew);
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

  // next test
});
```

Run `npm run test` :

![alt text](assets/findOne.png 'Finding one record test')

## Finding Records using ObjectID

We'll find the records using the `_id` property of the record, which can be seen on the collection `mariochars` in Robo-3T.

![alt text](assets/id.png 'ID property of a record')

You should have noticed that the `_id` is an `Object{}` type and not a `String` type!

Mongo has not problem identifying this as a string, but while asserting, we will run into an error if we do not convert these objects into strings.

Let's do it:

```js
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
```

> NOTE: Make sure you make the `char` variable global, by declaring it outside the `beforeEach()` and inside the `describe()` functions.

Run `npm run test`:

![alt text](assets/find_id.png 'Find a record with Object ID')

## Deleting Records

We'll be checking out 3 methods for this:

- `char.remove()`
  The single instance of the model `MarioChar` , i.e `char` will be removed.
- `MarioChar.remove()`
  Called on the model itself and it refers to the whole collection.
- `MarioChar.findOneAndRemove()`
  Used on the model to find the first one that matches the criteria and deletes that record

### Process

- Create and save a new record into the db.
- Use `findOneAndRemove()` to remove the record.
- Try to `findOne` in the db (the one we just removed).
- Assert that the result is null.

> NOTE: Remember all these functions are asynchronous!

Create a new file `deleting_test.js`.

```js
  // findOneAndremove() record from DB test
  it('Deletes one record from db', function (done) {
    MarioChar.findOneAndRemove({ name: 'Luigi'})
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
```

We need to add the appropriate `catch()` blocks for the `Promises` that we are using since all these functions are asynchronous, otherwise Mocha will display an error.

We also get a warning saying :

```text
(node:11281) DeprecationWarning: Mongoose: `findOneAndUpdateMany()` and `findOneAndDelete()`without the `useFindAndModify` option set to false are deprecated.
See: https://mongoosejs.com/docs/deprecations.html#findandmodify (Use `node --trace-deprecation ...` to show where the warning was created)
```

To get rid of this warning, add the `useFindAndModify : true` in the `connect()` function of `connection.js`.
This will update the connection properties and get rid of this warning.

![alt text](assets/delete.png 'Deleteing a record from the db')

## Updating Records

The various methods to update include:

- `char.updateMany()`
- `marioChar.updateMany()`
- `MarioChar.findOneandUpdateMany()`

These above functuions are almost similar in terms of properties to deleting records. The only difference is that these functions update the records instead of deleting them.

Apart from the `criteria` arguement in these functions, we also pass a second parameter as an object which represents all the changes/updates we want to make to all those records

### [Process]

- Create and save a new record in db.
- Use `findOneAndUpdateMany()` to update the name of the record.
- Try to `findOne` record in the db (the one we just updated).
- Assert that the result has the updated property value.

Let's start off by creating a new file for this test : `updating_test.js`

```js
  // findOneAndUpdateMany() record from DB test
  it('Update one record in the db', function (done) {
    MarioChar.findOneAndUpdateMany({ name: 'Luigi' }, { name: 'Princess Peach', weight: 51 })
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
```

And OH! We have an error!

```text
  1) Updating records
       Update one record in the db:
     Error: Timeout of 2000ms exceeded.
     For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves.
```

> We'll have to remove all the assert() calls from the previous test files in the `beforeEach()` function call. The `done()` function will remain as is.

![alt text](assets/update.png 'Update a record in the db')

If we look at the record in Robo-3T, we can see that the record has been updated :

![alt text](assets/robo-update.png 'Updated record with name and weight on Robo-3T')

## Update Operators

The `update` operator helps us update our fields in the records in a certain way.

To fetch all the records, we use the `.updateMany()` method. To update all the records, we leave the first param empty.

> NOTE: The `update()` method has been deprecated. Use `updateOne()`, `updateMany()` or `bulkWrite()` instead.

In the second parameteer, we'll use the `increment operator`, i.e `$inc` in the following manner:

```js
MarioChar.updateMany({}, { $inc: { weight: +1 } });
/* OR
 * MarioChar.updateMany({}, { $inc: { weight: 1 } });
 * works without the + as well for positive increments!
 */
```

Notice how we increment the `weight` property of the record using `+1`.

If we wanted to increment the weight by `+5`, we just say `{weight : +5}`. To reduce it, just use a negative number.

[updating_test.js]

```js
// Increment weight by 1
it('Increments weight by 1', function (done) {
  MarioChar.updateMany({}, { $inc: { weight: +1 } })
    .then(() => {
      MarioChar.findOne({ _id: char._id })
        .then(result => {
          assert(result.weight === 51);
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
```

![alt text](assets/update-operator.png 'updating records using the increment operator')

To explore more on MongoDB operators, check out the [official documentation](https://docs.mongodb.com/manual/reference/operator/update/).
