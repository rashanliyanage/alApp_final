questionModel =require('../model/questionModel');

async function addQuestion(req,callback) {
    
    subjectId = req.body.subjectId;
    //topicId  =req.body.topicId;
    year =req.body.year;
    qNumber =req.body.qNumber;
    question =req.body.question;
    number =req.body.number;
    qImageUrl =req.body.qImageUrl;
    correctAnswer =req.body.correctAnswer;
    answers =req.body.answers;

    const newQuestion = new questionModel()
        newQuestion.subjectId=subjectId,
       //topicId =topicId,
       newQuestion.year =year,
       newQuestion.qNumber =qNumber,
       newQuestion.question =question,
       newQuestion.number =number,
       newQuestion.qImageUrl =qImageUrl,
       newQuestion.correctAnswer =correctAnswer,
       newQuestion.answers =answers
    
     newQuestion.save(function(err,newQuestion){
           callback(err,newQuestion);
     })
     .catch(err => {
         res.status(500).json({
             state: false
         }) 
     });   
}

module.exports ={ 
    addQuestion:addQuestion
}