const mongoose = require('mongoose');

const SubjectSchema = mongoose.Schema({
    name: { type: String, default:null },
    displayName: { type:String, default:null },
    topic: [{ 
        number: { type:Number },
        name: { type:String, default:null },
        displayName: { type:String, default:null}
    }]
});
 
module.exports = mongoose.model('Subjects', SubjectSchema);