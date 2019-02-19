const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const SubjectSchema = mongoose.Schema({

    name: { type: String, default:null, },
    displayName:{type:String,default:null},
    topic:[{ 
          
        number:{type:Number,},
        
        name:{type:String,default:null,},
        displayName:{type:String,default:null}

       }
    
    ],




});

var subject = mongoose.model('Subjects', SubjectSchema);

module.exports =subject;

