require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const router = require('./routes/routes')

const PORT = process.env.PORT || 7000

app.use(cors())

mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Database connected'))
    .catch(e => console.log('Error:', e))

app.use('/', router)

app.listen(PORT, () => console.log(`Server running on ${PORT}`))