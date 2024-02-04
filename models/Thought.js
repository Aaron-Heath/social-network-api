const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema({
    thoughtText:{
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: new Date().now(),
        // Use a getter method to format the timestamp on query
    },
    username: {
        type: String,
        ref: 'user',
        required: true
    },

    //     reactions (These are like replies)
        // Array of nested documents created with the reactionSchema
})

module.exports = Thought