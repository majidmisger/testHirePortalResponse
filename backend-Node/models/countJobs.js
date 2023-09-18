const mongoose = require('mongoose');

const CountJob = new mongoose.Schema({
  type: String,
  countPerDay: {
    Received: [Number],
    Applied: [Number]
  }
});



module.exports = mongoose.model('countJob', CountJob);
