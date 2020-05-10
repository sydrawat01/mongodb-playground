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
  .catch((err) => {
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
