import jwt from 'jsonwebtoken'

export const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.ACCESS_SECRET, {expiresIn: "30m"})
}

export const generateRefreshToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.REFRESH_SECRET, {expriresIn: "7d"})
}