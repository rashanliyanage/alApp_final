questionModel = require('../model/questionModel');

async function addQuestion(qes,cb) {

    const newQuestion = new questionModel()
       newQuestion.subjectId = qes.subjectId,
       newQuestion.topicId = qes.topicId,
       newQuestion.year = qes.year,
       newQuestion.qNumber = qes.qNumber,
       newQuestion.question = qes.question,
       newQuestion.number = qes.number,
       newQuestion.qImageUrl = qes.qImageUrl,
       newQuestion.correctAnswer.cAnsNumber = qes.cAnsNumber,
       newQuestion.answers.aNumber = qes.aNumber,
       newQuestion.answers.aValue = qes.aValue,
       newQuestion.videoId = qes.videoId,
       newQuestion.ansDiscription = qes.ansDiscription
    
     newQuestion.save(cb)
     .catch(err => {
         res.status(500).json({
             state: false,
             error:err
         }) 
     });   
}

module.exports ={ 
    addQuestion:addQuestion
}