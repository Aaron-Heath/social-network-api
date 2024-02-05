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

router.put('/', async (req,res) => {
    // Update existing user
    try {
        const updatedUser = await User.findOneAndUpdate(
            {_id: req.body.id},
            {$set: req.body},
            {runValidators: true,new:true}
        );

            if(!updatedUser) {
                return res.status(404).json({message: "No record found"});
            }

            res.json(updatedUser);

    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Something went wrong."});
    }
});

router.delete('/', async (req, res) => {
    // Delete user by id
    try {
        const deletedUser = await User.findOneAndDelete({
            _id: req.body.id
        });

        if(!deletedUser) {
            return req.status(404).json({message:"No record found"});
        }

        return res.json(deletedUser);

    } catch (err) {
        console.log(err);
        return res.status(500).json({message: "Something went wrong."})
    }


})

module.exports = router;