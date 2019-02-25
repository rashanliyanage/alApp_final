var User = require('../model/userModel');
var UserModel =User.userModel;
var bcrypt = require('bcryptjs');


var userRegister =function (newUser,res,callback){
    UserModel.find({email:newUser.email},function(err,user){
        if(err){
            throw err;
        
        }else if(user.length>0){
            console.log(user)
            res.status(200).json({
                success:true, msg :'user alredy exist here'    
            });

        }else{
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(newUser.password, salt, function(err, hash) {
                    if(err){
                        throw err;
                    }else{

                    newUser.password =hash;
                  console.log(newUser);
                   
                    newUser.save(function(err,user){
                        console.log(err)
                        callback(err,user);
                    });
                    }
            });

        });
        }
    });
}

var  getStudentByDistric = function(serchkey,callback){
    console.log(serchkey);

    User.find({city:serchkey})
    .exec()
    .then(students=>{
        callback(null,students);

    }).catch(err=>{
            callback(err,null);
    });

}

var  getStudentWithoutDisctric = function(callback){

    User.find()
    .exec()
    .then(students=>{
        callback(null,students);

    }).catch(err=>{
        callback(err,null);
    });

}


var getTeacher = function(){
    User.find({city:serchkey, role:"teacher"})
    .exec()
    .then(function(err,teachers){


    });


}

module.exports.getUserById = function(id, callback){
    UserModel.findOne(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
    console.log(username+'fjfklsfk');
    const query  = { userName: username }
    UserModel.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err;
          newUser.password = hash;
          newUser.save(callback);
        });
    });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
}


module.exports.userRegister =userRegister;
module.exports.getStudentByDistric =getStudentByDistric;
module.exports.getStudentWithoutDisctric =getStudentWithoutDisctric;