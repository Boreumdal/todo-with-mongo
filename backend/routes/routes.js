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

// USER: VERIFY TOKEN
router.get('/user/:token', async (req, res) => {
    const { token } = req.params

    jwt.verify(token, process.env.JWT_TOKEN_S, (err, decoded) => {
        if (err) throw err
        return res.json({ user: decoded._doc })
    })
})

// TODO: ADD TO DATABASE
router.post('/todo', async (req, res) => {
    const body = req.body

    const todo = new Todo({
        what: body.what,
        when: body.when,
        who: body.who,
        bg: body.bg,
        status: 'todo',
        star: 1
    })
    todo.save()

    return res.json({ msg: 'Todo added'})
})

router.delete('/todo', async (req, res) => {
    await Todo.findByIdAndDelete(req.body.id)

    res.json({ msg: 'Deleted' })
})

router.patch('/todo/toggle', async (req, res) => {
    await Todo.findByIdAndUpdate(req.body.id, { status: 'todo-edit' })

    res.json({ msg: `Editing ${req.body.id.substring(0, 10)}...` })
})

router.patch('/todo/mark', async (req, res) => {
    await Todo.findByIdAndUpdate(req.body.id, { star: 2 })
    
    res.json({ msg: `Bookmarked ${req.body.id.substring(0, 10)}...` })
})

router.patch('/todo/unmark', async (req, res) => {
    await Todo.findByIdAndUpdate(req.body.id, { star: 1 })
    
    res.json({ msg: `Bookmark ${req.body.id.substring(0, 10)}... removed` })
})

router.patch('/todo/done', async (req, res) => {
    await Todo.findByIdAndUpdate(req.body.id, { status: 'done', bg: 'h' })
    
    res.json({ msg: `Todo ${req.body.id.substring(0, 10)}... marked as done` })
})

router.patch('/todo', async (req, res) => {
    await Todo.findByIdAndUpdate(req.body.id, { what: req.body.what, when: req.body.when, status: 'todo' })

    res.json({ msg: `Todo ${req.body.id.substring(0, 10)}... saved` })
})

// TODO: FETCHES ALL TODO TO BE DISPLAYED
router.get('/todo/:id', async (req, res) => {
    const { id } = req.params
    const todos = await Todo.find({ who: id })

    return res.json({ todos })
})

module.exports = router