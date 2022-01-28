// UserEvent model in the database
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;


const Schema = mongoose.Schema;
const userEventSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        // ref: 'User',
        required: true,
        unique: true
    },
    likes: [{
        type: Schema.Types.ObjectId,
        // ref: 'Like',
        required: true
    }],
    reads: [{
        type: Schema.Types.ObjectId,
        // ref: 'Read',
        required: true
    }]
})

// Export the model
module.exports = mongoose.model('UserEvent', userEventSchema);