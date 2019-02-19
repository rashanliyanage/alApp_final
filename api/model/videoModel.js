const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const VideoSchema = mongoose.Schema({

    //topic shoud re consider
    //topic shoud re consider
    userId:{ type:Schema.Types.ObjectId, ref: 'User'},
    topic:{type:String,required:false},
    uploadedDate:{type:Date,default:Date.now()},
    expireDate:{type:Date},
    status:{type:Boolean,default:false},
    rate:{type:Number,required:false},
    ratedUserCount:{type:Number,required:false},
    viewCount:{type:Number,required:false},
    LikesCount:{type:Number,required:false},
    comments:[
        {user_id:{type:Schema.Types.ObjectId, ref: 'User'},
         comment:{type:String}
        }
    ]

});


const topicSchema = mongoose.Schema({
   


});

module.exports ={
   VideoMOdel: mongoose.model('Videos',VideoSchema)

}

