const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const SubjectSchema = mongoose.Schema({

    name: { type: String, required: false,default:null, },
    displayName:{type:String,require:false,default:null},
    topic:[{ 
          
        number:{type:Number,default:null,require:false},
        
        name:{type:String,default:null,require:false},
        displayName:{type:String,default:null,require:false}

       }
    
    ],




});

var subject = mongoose.model('Subjects', SubjectSchema);

module.exports =subject;

