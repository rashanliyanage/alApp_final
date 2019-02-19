const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const QuestionSchema = mongoose.Schema({
     subjectId:{type:Schema.Types.ObjectId, ref: 'Subjects'},
     topicId:{type:Number,default:null,require:true},// need to referance topic id in topic schem  (not fix)
     year:{type:String,require:true,default:null},
     qNumber:{type:String,require:false,default:null},// question number of paper
     question:{type:String,default:null,require:false},//question
     number:{type:Number,default:false,require:false},
  
     qImageUrl:{type:String,require:false,default:null},
     correctAnswer:[{
        number:{type:Number,require:false,default:null},
     }],
     answers:[
            {
            number:{type:Number,require:false,default:null},
            value:{type:String,require:false,default:null},// answer
            aImageUrl:{type:String,require:false,default:null}//answer image url
          }
     ],
     videoId:[{type:Schema.Types.ObjectId, ref: 'Videos'}],
     ansDiscription:{type:String,require:false,default:null},//should be a url

});
var QuestionModel = mongoose.model('Questions', QuestionSchema);
module.exports =QuestionModel;