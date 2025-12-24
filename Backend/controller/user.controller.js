import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
import { generateToken, generateRefreshToken } from '../utils/token.js'

export const registerUser = async (req, res) => {
    if(!req.body){
        return res.status(400).send({message: "Content body missing"})
    }

    const { username, email, password } = req.body

    try {
        const user = await User.findOne({ email })

        if(user){
            return res.status(400).send({ message: "User already exists"})
        }

        const HashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            name: username,
            email: email,
            password: HashedPassword
        })

        newUser.save()
        return res.status(201).send({ message: "User registered successfully"})
    }catch (err){
        return res.status(500).send({ message: "Internal Server Error when registering user"})
    }
    
}