const mongoose = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new mongoose.Schema({
    thoughtText:{
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // Use a getter method to format the timestamp on query
    },
    username: {
        type: String,
        ref: 'user',
        required: true
    },
    reactions: [reactionSchema]

    //     reactions (These are like replies)
        // Array of nested documents created with the reactionSchema
});

thoughtSchema.methods.getCreationDate = function() {
    // return format(new Date(this.createdAt), "MM/dd/yyyy ppp");
    const date = new Date(this.createdAt);
    return date.toLocaleDateString("en-us") + " " + date.toLocaleTimeString("en-us");
}

const Thought = mongoose.model('thought', thoughtSchema);

module.exports = Thought