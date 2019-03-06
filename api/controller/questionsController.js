questionModel = require('../model/questionModel');

async function addQuestion(req,callback) {
    
    subjectId = req.body.subjectId,
    topicId = req.body.topicId,
    year = req.body.year,
    qNumber = req.body.qNumber,
    question = req.body.question,
    number = req.body.number,
    qImageUrl = req.body.qImageUrl,
    cAnsNumber = req.body.cAnsNumber,
    aNumber = req.body.aImageUrl,
    aValue = req.body.aImageUrl,
    videoId = req.body.vedioId,
    ansDiscription = req.body.ansDiscription

    const newQuestion = new questionModel()
       newQuestion.subjectId = subjectId,
       newQuestion.topicId = topicId,
       newQuestion.year = year,
       newQuestion.qNumber = qNumber,
       newQuestion.question = question,
       newQuestion.number = number,
       newQuestion.qImageUrl = qImageUrl,
       newQuestion.correctAnswer.cAnsNumber = cAnsNumber,
       newQuestion.answers.aNumber = aNumber,
       newQuestion.answers.aValue = aValue,
       newQuestion.videoId = videoId,
       newQuestion.ansDiscription = ansDiscription
    
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