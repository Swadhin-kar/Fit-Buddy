import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../model/user.model.js'
import { generateToken, generateRefreshToken } from '../utils/token.js'

export const registerUser = async (req, res) => {
    console.log("REQ BODY:", req.body);
    if (!req.body) {
        return res.status(400).send({ message: "Content body missing" })
    }

    const { username, email, password, age, gender } = req.body

    try {
        const user = await User.findOne({ email })

        if (user) {
            return res.status(400).send({ message: "User already exists" })
        }

        const HashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            name: username,
            email: email,
            password: HashedPassword,
            age: age,
            gender: gender
        })

        await newUser.save()
        
        const accessToken = generateToken(newUser._id)
        const refreshToken = generateRefreshToken(newUser._id)
        
        newUser.refreshToken = refreshToken
        await newUser.save()
        
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/"
        })
        .cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/"
        })
        

        return res.status(201).send({ message: "User registered successfully" })
    } catch (err) {
        return res.status(500).send({ message: "Internal Server Error when registering user" })
    }
}

export const loginUser = async (req, res) => {
    if (!req.body)
        return res.status(400).send({ message: "Content body missing" })

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email })

    if (!existingUser) {
        return res.status(401).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
        return res.status(401).json({ message: "Invalid Credentials" });
    }

    const accessToken = generateToken(existingUser._id)
    const refreshToken = generateRefreshToken(existingUser._id);

    existingUser.refreshToken = refreshToken
    await existingUser.save()

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/"
    })
        .cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/"
        })
        .json({ message: "Login successful" })
}

export const refresh = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) return res.sendStatus(401);

    const existingUser = await User.findOne({ refreshToken });

    if (!existingUser) return res.sendStatus(403);

    jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err) => {
        if (err) return res.sendStatus(403);

        const newAccessToken = generateToken(existingUser._id)

        res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict"
        });

        res.json({ message: "Token refreshed" })
    })
}

export const logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken


    const existingUser = await User.findOne({ refreshToken })

    if (existingUser) {
        existingUser.refreshToken = null;
        await existingUser.save()
    }

    res.clearCookie("accessToken")
    res.clearCookie("refreshToken")
    res.json({ message: "Logged out" })
}

export const verify = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select("-password -refreshToken")
      .lean();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      loggedIn: true,
      user
    });
  } catch (error) {
    console.error("Verify error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
