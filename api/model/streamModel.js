const mongoose = require('mongoose');

const streamSchema = mongoose.Schema({
    name: { type: String, default:null },
    displayName: { type:String, default:null },
});

module.exports = mongoose.model('Streams', streamSchema);