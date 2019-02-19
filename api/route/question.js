var  express = require('express');
var  router = express.Router();
var  questionController =require('../controller/questionsController')

router.post('/addQuestion',(req,res)=>{
    console.log("in add question");
    questionController.addQuestion(req,function(err,newQuestion){

        if(err){
            res.status(400).json({
                success:false, msg:"failed register user"
            });

            
        }else{
           
            res.status(200).json({
                    
                success:true, msg:"new question successfully added"

            });

        }
    });
})
module.exports = router;