const router = require('express').Router();
const mongoose = require('mongoose');
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

router.get('/:userId', async (req,res) => {
    // Get user by Id
    try{
        const user = await User.findOne({
            _id: req.params.userId
        })
        .populate('thoughts')
        .populate('friends');

        if(!user) {
            res.status(400).json({message: "No record found."});
            return
        }

        res.status(200).json(user);

    } catch(err) {
        console.log(err);
        res.status(500).json({message: "Something went wrong"});
    }
    
})

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