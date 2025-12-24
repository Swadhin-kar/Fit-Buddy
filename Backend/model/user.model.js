import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true,
        unique : false
    },
    email: {
        type : String,
        required : true,
        unique : true
    },
    password: {
        type : String,
        required : true,
        unique : false
    },
    age: {
        type :Number, 
        required : true,
        unique : false
    },
    gender: {
        type : String,
        required : true,
        unique : false
    },
    height: {
        type: Number,
        required: false,
        unique: false
    },
    weight:{
        type: Number,
        required: false,
        unique: false
    },
    profilePicture: {
        type: URL,
        required: false,
        unique : false
    }
})

const User = mongoose.model('User', userSchema)

export default User