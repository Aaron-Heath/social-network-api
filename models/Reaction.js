// reactionId
const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
    reactionId: {
        type: mongoose.Schema.Types.ObjectId,
        default: new mongoose.Schema.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

// Use Mongoose's ObjectId data type
    // Default value is set to a new ObjectId

// reactionBody
    // String
    // Required
    // 280 character maximum

// username
    // String
    // Required
// createdAt
    // Date
    // Set default value to the current timestamp
    // Use a getter method to format the timestamp on query