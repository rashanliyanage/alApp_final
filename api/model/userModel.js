const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const userSchema = mongoose.Schema({
  
    // email: { 
    //     type: String, 
    //     required:false, 
     //     type: String, 
   
    //     lowercase: true,
    //  //   match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    // },
    password: { type: String, required: false },
    role: { type: String, required: false },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    userName: { type: String, required: false, unique:false},
    city: { type: String, required: false },
    contactNumber:{type: String, required:false,},
    stream :{type:String, require:false},
    class: [{
        district: { type: String,required :false },
        institute: { type: String,required :false },
        classDate: { type: String,required :false }
    }]
});

//module.exports = mongoose.model('User', userSchema);
module.exports.userModel = mongoose.model('User', userSchema);

