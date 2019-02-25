var subjectModel =require('../model/subjectModel');
var streamModel =require('../model/streamModel');


/**
 * created by:Rashan
 * created at:
 * reason: add subject from admin 
 * 
 * **/

async function addSubject(subjectName,displayName,callback) {

 if((subjectName !=null) && (displayName!=null)){

var newSubject =  new subjectModel({
  name:subjectName,
  displayName:displayName
}); 

newSubject.save(callback).catch(err);

 }
}

/**
 * created by:Yohan
 * created at:
 * reason: to get subject from mobile application
 * 
 * **/

async function getSubject(res,callback) {
    subjectModel.find().exec().then(subjects=>{
      res.status(200).send({
        success:true,
        msg:"success get subjects",
        subjects:subjects
      });
   
    }).catch(err=>{
      res.status(500).send({
        success:false,
        msg:"internal server error",
        
      });

    });;
  
 }

 async function getYeasBySubject(res,subjectId){
       

 }

module.exports.addSubject = addSubject;
module.exports.getSubject = getSubject;
