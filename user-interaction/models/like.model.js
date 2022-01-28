// like model in the database
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;


const Schema = mongoose.Schema;
const likeSchema = new Schema({
    content: {
        type: Schema.Types.ObjectId,
        // ref: 'Content',
        required: true,
        unique: true
    },
    users: [{
        type: Schema.Types.ObjectId,
        // ref: 'User',
        required: true
    }]
})


// Export the model
module.exports = mongoose.model('Like', likeSchema);