const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Todo = require('../models/Todo')

// router.get('/', (req, res) => {
//     res.send('asdas')
// })

// USER: LOGIN
router.post('/login', async (req, res) => {
    const user_exist = await User.exists({ username: req.body.username })

    if (user_exist){
        const user = await User.findOne({ username: req.body.username })

        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) throw err
            if (!result){
                return res.json({ err: 'Wrong password' })
            }
            
            const token = jwt.sign({ ...user }, process.env.JWT_TOKEN_S)
            return res.json({ token })
        })
    } else {
        res.json({ err: 'User not found'})
    }
})

// USER: REGISTER
router.post('/register', async (req, res) => {
    const user_exist = await User.exists({ $or: [{ username: req.body.username }, { email: req.body.email }] })
    if (user_exist) {
        return res.json({ err: 'User already exists' })
    }

    bcrypt.genSalt(12, (err, salt) => {
        if (err) res.json({ err: 'Error in generating salt' })
        bcrypt.hash(req.body.password, salt, (err, password) => {
            if (err) res.json({ err: 'Can\'t generated passwod' })
            if (!password) res.json({ err: 'Error in generating password' })

            const user = new User({
                username: req.body.username,
                email: req.body.email,
                password
            })
            user.save()

            return res.status(200).json({ msg: 'User registered successfully' })
        })
    })
})

router.get('/user/:token', async (req, res) => {
    const { token } = req.params

    jwt.verify(token, process.env.JWT_TOKEN_S, (err, decoded) => {
        if (err) throw err
        return res.json({ user: decoded._doc })
    })
})

module.exports = router