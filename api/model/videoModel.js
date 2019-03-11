const mongoose = require('mongoose');

const VideoSchema = mongoose.Schema({  
    userId:{ type:mongoose.Schema.Types.ObjectId, ref: 'User'},
    topic:{type:String,required:false},
    uploadedDate:{type:Date,default:Date.now()},
    expireDate:{type:Date},
    status:{type:Boolean,default:false},
    rate:{type:Number,required:false},
    ratedUserCount:{type:Number,required:false},
    viewCount:{type:Number,required:false},
    LikesCount:{type:Number,required:false},
    comments:[{
        user_id:{type:mongoose.Schema.Types.ObjectId, ref: 'User'},
        comment:{type:String}
    }]
},{
    timestamps: true
});

module.exports = mongoose.model('Videos',VideoSchema)
