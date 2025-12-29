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
        required : false,
        unique : false
    },
    gender: {
        type : String,
        required : false,
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
        type: String,
        required: false,
        unique : false
    },
    refreshToken:{
        type: String
    }
},{timestamps: true})

const User = mongoose.model('User', userSchema)

export default User