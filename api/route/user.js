

var User = require('../model/userModel');
var UserModel =User.userModel;
var  express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
var  router = express.Router();
var config =require('../../config/dbconfig');
var userController = require('../controller/userController');
const { checkBody,check, validationResult } = require('express-validator/check');

/**
 * created by:Rashan samtih
 * created at:
 * reason: register user
 * 
 * **/

router.post('/register',[
            check('password').isLength({ min: 8 }),
            check('userName').not().isEmpty()

],function(req,res){
            var firstName = req.body.firstName;
            var lastName  = req.body.lastName;
            var userName  = req.body.userName;
            var password  = req.body.password;
            var city  = req.body.city;
            var stream    = req.body.stream;
            var contactNumber =req.body.contactNumber;

            const errors = validationResult(req);

             if (!errors.isEmpty()) {
              return res.status(422).json({ errors: errors.array() });
            }


                    var newuser = new UserModel();
                    newuser. firstName =firstName,
                    newuser.lastName = lastName,
                    newuser.userName = userName,
                    newuser. password =password;
                    newuser.city= city,
                    newuser.stream=stream,
                    newuser.contactNumber=contactNumber,
                    newuser.role=req.body.role

                   
   
userController.userRegister(newuser,res,(err,user)=>{


        if(err){
            res.status(400).json({
                success:false, msg:"failed register user"
            });

            
        }else{
           
            res.status(200).json({
                    
                success:true, msg:"register successfully"

            });

        }

});

});

router.post('/userVerify', (req, res, next) => {
    var state = req.body.state;
    var email = req.body.email;
    if(state){
        User
            .find({ email: email})
            .exec()
            .then(user => {
                console.log(user);
                user
                    .update({ email: email },{$set: { isVerified: true }})
                    .then(result => {
                        console.log(result);
                        res.status(200).json({
                            state: true
                        }) 
                    })
                    .catch(err => {
                        res.status(500).json({
                            state: false
                        })
                    })
            })
            .catch(err => {
                res.status(500).json({
                    state: false
                })
            })
    }
})

/**
 * created by:Yohan
 * created at:
 * reason:authenticate user
 * 
 * **/

router.post('/teacherRegistration',(req,res,next)=>{
      const name =req.body.name;
      const email =req.body.email;
      const password =req.body.passport;
      

});


router.post('/authenticate', (req, res, next) => {
    const username = req.body.userName;
    const password = req.body.password;
    console.log(username);

    userController.getUserByUsername(username, (err, user) => {
       if(err) throw err;
       if(!user){
           return res.json({success: false, msg: 'User not found'});
       } 

       userController.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 604800
                });
            res.json({
                success:true,
                token: 'JWT' + token,
                user:{
                    id: user._id,
                    name: user.name,
                    username: user.username,
                    email: user.email
                }
            });
            } else {
                return res.json({success: false, msg: 'Wrong Password'});
            }
       });
    });
});


/**
 * created by:Rashan samtih
 * created at:
 * reason:get student for admin panel with search distric
 * 
 * **/


router.get('/get-student/:searchDistric',function(req,res){
    
    const serchkey = req.params.searchDistric;
    console.log(serchkey);
    

    if( !(serchkey == undefined || serchkey ==null || serchkey == '') ){

        userController.getStudentByDistric(serchkey,function(err,students){
            if(err){
                res.status(500).json({
                    success:false,msg:"failed to geting student"

                });
            }else{
                 
            res.status(200).json({
                    
                success:true, msg:"success getting students",
                students:students

            });

            }

        });

    } 
});

/**
 * created by:Rashan samtih
 * created at:
 * reason:get student for admin panel
 * 
 * **/

router.get('/get-student',function(req,res){

    userController.getStudentWithoutDisctric(function(err,students){

        if(err){
            res.status(500).json({
                success:false,msg:"failed geting student"
                
            });
        }else{
             
        res.status(200).json({
                
            success:true, msg:"success getting students",
            students:students

        });
    }  

});

});



module.exports = router;

