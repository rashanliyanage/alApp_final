const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const streamSchema = mongoose.Schema({

    name: { type: String, required: false,default:null, },
    displayName:{type:String,require:false,default:null},

});

var stream = mongoose.model('streams', streamSchema);

module.exports =stream;
