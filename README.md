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

Another thing that is important is using the new `conect()` method. The older methods are noe depriciated, and now the connection string requires you to add two important parameters as well while connecting to any local or remote db:

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
