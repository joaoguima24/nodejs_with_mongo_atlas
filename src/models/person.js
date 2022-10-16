const mongoose = require('mongoose');

const person = mongoose.model('Person',{
    name: String,
    level: Number,
    approved: Boolean,
});

module.exports= person;