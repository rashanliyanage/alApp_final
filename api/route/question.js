var  express = require('express');
var  router = express.Router();
var  questionController =require('../controller/questionsController')

router.post('/add-question',(req,res)=>{
    console.log("add question");
    const question = {
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
      }

      questionController.addQuestion(question, function (err, question) {
        if (err) {
            throw err;
        } else {
            res.status(200).send({
                success: true,
                question: question,
                msg: 'success add question'
            });
        }
    });
});

router.get('/getQuestion',(req,res)=>{
    console.log("add question");
    questionController.getQuestion(req,function(err,newQuestion){

    });
})

router.get('/getYears',(req,res)=>{
    console.log("add question");
    questionController.addQuestion(req,function(err,newQuestion){

    });
})









/*get years by subject 
  get topic list by subject
  get question 
*/



module.exports = router;