import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

const app = express()
dotenv.config()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const PORT = process.env.PORT || 7001

app.get('/test', (req, res) => {
    res.send('API is working properly')
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})