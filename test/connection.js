const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const URI = 'mongodb://localhost:27017/testaroo';
// connect to mongodb
before(function (done) {
  mongoose
    .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('connected!');
      done();
    })
    .catch(err => {
      console.log('error', err.message);
    });
});
