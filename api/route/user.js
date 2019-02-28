var User = require('../model/userModel');
var bcrypt = require('bcrypt')
var express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
var router = express.Router();
var config = require('../../config/dbconfig');
var userController = require('../controller/userController');
var emailController = require('../controller/emailController');

router.post('/register', (req, res, next) => {
    console.log("register")
    var verificationCode = emailController.generateRandomNumber()
    User
        .find({ email: req.body.email })
        .exec()
        .then(user => { 
            if(user.length >= 1){
                console.log('user exist');
                return res.status(409).json({
                    state: false, 
                    exist: true
                });
            } else {
                console.log("else block")
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    console.log(hash)
                    if(err){
                        return res.status(500).json({     
                        });
                    }else {
                        userController.saveUser(req, hash, verificationCode)
                            .then(result => {
                                var receiver = req.body.email;
                                emailController.sendVerificationCode(receiver, verificationCode)
                                console.log("User signed up"); 
                                    res.status(201).json({
                                    state: true,
                                    exist: false,
                                    code: verificationCode
                                });
                            })
                            .catch(err => {
                                console.log(err);  
                                res.status(500).json({
                                    error: err,
                                    state: false,
                                    Message: "Some Validation Errors"
                                });
                            });
                    }
                });
            }
        })
})

router.post('/userVerify', (req, res, next) => {
    var email = req.body.email;
    var code = req.body.code;
    console.log(email);
    console.log(code);
    User
        .find({ email: email })
        .exec()
        .then(user => {
            console.log(user[0].isVerified);
            if(user[0].isVerified == false){
                if(user[0].verificationCode == code){
                    console.log("second if")
                    user[0]
                        .update({ $set: { isVerified: true } })
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
                } else{
                    res.status(200).json({
                        state: false,
                        msg: "Verification Code Incorrect"
                    })
                }
                
            } else{
                res.status(200).json({
                    state: false,
                    msg: "User Already Verified"
                }) 
            }
            
        })
        .catch(err => {
            res.status(500).json({
                state: false
            })
        })
})

router.post('/login', (req, res) =>{
    console.log("login")
    User 
        .find({ email: req.body.email })
        .exec()
        .then(user => {
            if(user.length < 1){
                return res.status(200).json({
                    state: false,
                    JWT_Token: null
                });
            }
            console.log(user);
            console.log(user[0].password);
            console.log(req.body.password);
            console.log(process.env.JWT_KEY);
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (result){
                    token = jwt.sign({user: user[0]}, process.env.JWT_KEY, {expiresIn: "10h"}, (err, token) => {
                        if(err){
                            res.json({ error: err })
                        } else {
                            return res.status(200).json({
                                state: true,
                                JWT_Token: token 
                            }) 
                        }
                        console.log('token genetas : '+ this.token);
                    });  
                }
                else {
                    return res.status(200).json({
                        state: false,
                        JWT_Token: null
                    })
                }
            });
        })
        .catch(err => { 
            console.log(err);
                res.status(500).json({
                error: err
            }); 
        });
});

router.get('/emailCheck/:email', (req, res, next) => {
    var receiver = req.params.email;
    var verificationCode = emailController.generateRandomNumber()
    emailController.sendVerificationCode(receiver, verificationCode)
    res.status(200).json({
        state: true
    })
})

/**
 * created by:Yohan
 * created at:
 * reason:authenticate user
 * 
 * **/

router.post('/teacherRegistration', (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.passport;


});

/**
 * created by:Rashan samtih
 * created at:
 * reason:get student for admin panel with search distric
 * 
 * **/

router.get('/get-student/:searchDistric', function (req, res) {

    const serchkey = req.params.searchDistric;
    console.log(serchkey);


    if (!(serchkey == undefined || serchkey == null || serchkey == '')) {

        userController.getStudentByDistric(serchkey, function (err, students) {
            if (err) {
                res.status(500).json({
                    success: false, msg: "failed to geting student"

                });
            } else {

                res.status(200).json({

                    success: true, msg: "success getting students",
                    students: students

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

router.get('/get-student', function (req, res) {

    userController.getStudentWithoutDisctric(function (err, students) {

        if (err) {
            res.status(500).json({
                success: false, msg: "failed geting student"

            });
        } else {

            res.status(200).json({

                success: true, msg: "success getting students",
                students: students

            });
        }

    });

});



module.exports = router;

