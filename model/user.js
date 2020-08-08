const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        required: true,
        trim:true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:8
    },
    email:{
        type:String,
        required:true,
        unique:true,  
        trim:true,
    },
    phones:{
        type:String,
        required:true,
        unique:true,  
        trim:true,
    },
    avatar:{
        type:String,
        default:'default.jpg'
    },
    gender:{
        type:String,
        enum:['male','female']
    },
    role:{
        type:String,
        enum:['user','admin']
    }


},{
    collection: 'user'
}
);


module.exports = mongoose.model('User', UserSchema);