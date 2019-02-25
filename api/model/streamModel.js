const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const streamSchema = mongoose.Schema({

    name: { type: String, default:null, },
    displayName:{type:String,default:null},

});

var stream = mongoose.model('streams', streamSchema);

module.exports =stream;
