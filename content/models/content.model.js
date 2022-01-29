const mongoose = require('mongoose')
const { ObjectID } = mongoose.Schema.Types;

const contentSchema = new mongoose.Schema({
    serial: {
        type: Number,
    },
    title: {
        type: String,
        required: true,
    },
    story: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    publication_date: {
        type: Date,
        default: Date.now,
    }
})

const Content = mongoose.model("Content", contentSchema)

module.exports = Content