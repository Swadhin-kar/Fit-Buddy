import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'

const app = express()
dotenv.config()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const PORT = process.env.PORT || 7001
const URI = process.env.MONGO_URI

mongoose.connect(URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Error connnecting to MongoDB:", err))

app.get('/xyztestabc', (req, res) => {
    res.send('API is working properly')
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})