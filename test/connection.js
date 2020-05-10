const mongoose = require('mongoose');

// connect to mongodb
mongoose
  .connect('mongodb://localhost:27017/testaroo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected!');
  })
  .catch(err => {
    console.log('error', err.message);
  });
