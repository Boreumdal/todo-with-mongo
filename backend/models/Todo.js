const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
    what: {
        type: String,
        required: true
    },
    when: {
        type: String,
        required: true
    },
    who: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    star: {
        type: Number,
        required: true
    },
    bg: {
        type: String,
        required: true
    },
    created_at: {
        type: Number,
        default: Date.now()
    }
})

const Todo = mongoose.model('Todo', TodoSchema)

module.exports = Todo