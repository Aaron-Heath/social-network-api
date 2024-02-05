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
        get: getFormattedCreation
    },
    username: {
        type: String,
        ref: 'user',
        required: true
    },
    reactions: [reactionSchema],
},
{
    toJSON: {
        getters: true
    }
});

function getFormattedCreation(date) {
    // return format(new Date(this.createdAt), "MM/dd/yyyy ppp");
    return date.toLocaleDateString("en-us") + " " + date.toLocaleTimeString("en-us");
}

const Thought = mongoose.model('thought', thoughtSchema);

module.exports = Thought