const router = require('express').Router()
const { User, Thought } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const thoughts = await Thought.find({});

        if(!thoughts) {
            return res.status(404).json({message: "no record found"});
        }

        return res.json(thoughts);

    } catch (err) {
        console.log(err);
        return res.status(500).json({message: "Something went wrong."})
    }
});

router.get("/:thoughtId", async (req,res)=> {
    try{
        const thought = await Thought.findOne({_id: req.params.thoughtId});

        if(!thought) {
            return res.status(404).json({message: "No record found"});
        }

        res.json(thought);
    } catch(err) {
        console.log(err);
        return res.status(500).json({message: "Something went wrong."});
    }
});

router.post('/', async (req, res) => {


    // {
    //     "thoughtText": "Here's a cool thought...",
    //     "username": "lernantino",
    //     "userId": "5edff358a0fcb779aa7b118b"
    //   }
    try {
        // Create a new thought
        const newThought = await Thought.create({
            thoughtText: req.body.thoughtText,
            username: req.body.username
        });

        // Push thought to user
        const user = await User.findOneAndUpdate({_id: req.body.userId},
            {$push: {thoughts: newThought._id}});
        
        return res.json(newThought);
    } catch(err) {
        console.log(err);
        return res.status(500).json({message:"Something went wrong."});
    }
});

module.exports = router;