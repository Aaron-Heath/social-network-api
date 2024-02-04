const router = require('express').Router();
const { User, Thought } = require('../../models')

router.get('/', async (req,res) => {
    // Get all users
    try {
        const users = await User.find({});
        res.status(200).json(users);    
    } catch (err) {
        console.log(err);
        res.status(500).json({error:"Something went wrong"});

    }
    
});

router.post('/', async (req, res) => {
    // Create a new user
    const newUser = new User({
       username: req.body.username,
       email: req.body.email,
    });

    newUser.save();

    if (newUser){
        res.status(201).json(newUser);
    } else {
        console.log("Something went wrong.");
        res.status(500).json({error: "Something went wrong."});
    }
});

module.exports = router;