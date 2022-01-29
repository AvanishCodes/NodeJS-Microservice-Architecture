// like model in the database
const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const interactionSchema = new Schema({
    content: {
        type: Schema.Types.ObjectId,
        // ref: 'Content',
        required: true,
        unique: true
    },
    likes: [{
        type: Schema.Types.ObjectId,
        // ref: 'User',
        required: true
    }],
    reads: [{
        type: Schema.Types.ObjectId,
        // ref: 'User',
        required: true
    }]
})


// Export the model
module.exports = mongoose.model('Interaction', interactionSchema);