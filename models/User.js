const mongoose = require('mongoose');

// Declare userSchema
const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (email) {
                // Email validation regex
                return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(email);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    thoughts: [
        {type: mongoose.Schema.Types.ObjectId, ref:'thought'}
    ],
    friends: [
        {type: mongoose.Schema.Types.ObjectId, ref:'user'}
    ]
},
{
    toJSON: {
        virtuals: true
    }
});

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// Error handler function to be called when an error occurs when trying to save a document
const handleError = (err) => console.error(err);

const User = mongoose.model('user', userSchema);

module.exports = User;

// username
    // String
    // Unique
    // Required
    // Trimmed

// email
    // String
    // Required
    // Unique
    // Must match a valid email address (look into Mongoose's matching validation)

// thoughts
    // Array of _id values referencing the Thought model

// friends
    // Array of _id values referencing the User model (self-reference)
    // Schema Settings

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.