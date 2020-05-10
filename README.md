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

const { Schema } = mongoose.Schema;

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
