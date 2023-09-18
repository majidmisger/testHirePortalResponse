const mongoose = require('mongoose');


const activejobs = new mongoose.Schema({
    name: String,
    location: String,
    posted: String,
    status: String,
    applied: Number,
    jobViews: Number,
    daysLeft: Number,
    premium: Boolean,
    dateFormat: String
});

module.exports = mongoose.model('ActiveJob', activejobs);
