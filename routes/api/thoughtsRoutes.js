const router = require('express').Router()
const { User, Thought, Reaction } = require('../../models');

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

        if(!user) {
            return res.status(404).json({message: "Thought created but no user found"});
        }
        
        return res.json(newThought);
    } catch(err) {
        console.log(err);
        return res.status(500).json({message:"Something went wrong."});
    }
});

router.put('/', async (req, res) => {
    // Update single thought
    try {
        const updatedThought = await Thought.findOneAndUpdate(
            {_id: req.body.id},
            {$set: req.body},
            {new: true}
        );

        if(!updatedThought) {
            return res.status(404).json({message: "No record found."});
        }

        return res.json(updatedThought);
    } catch(err) {
        console.log(err);
        return res.status(500).json({message: "Something went wrong."});
    }
});

router.delete('/', async (req,res) => {
    try {
        const deletedThought = await Thought.findOneAndDelete({_id: req.body.id});

        if(!deletedThought) {
            return res.status(404).json({message:"No record found"});
        }

        res.json(deletedThought);
    } catch (err) {
        console.log(err);
        res.json({message:"Something went wrong."});
    }
});

router.post('/:thoughtId/reactions', async (req,res) => {
    // Create a reaction stored in a single thought's reactions array field
    // {
    //     reactionBody: "Text",
    //     username: "username",
    // }
    try{
        const reaction = await Reaction.create({
            reactionBody: req.body.reactionBody,
            username: req.body.username
        });
        const thought = await Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            { $addToSet: {reactions: reaction._id} },
            {new: true}
        );

        if(!thought) {
            return res.status(404).json({message: 'Reaction created, but no thought found'});
        }
        res.json({message: "Reaction created!"});

    } catch (err) {
        console.log(err);
        return res
        .status(500)
        .json({message:err})
    }


})

router.delete("/:thoughtId/reactions", async (req,res) => {
    // Pull and remove a reaction by the reaction's reactionId
    try {
        const reaction = await Reaction.findByIdAndDelete({_id: req.body.reactionId});

        if(!reaction) {
            return res.status(404).json({message:"No reaction found with that id"});
        }

        const thought = await Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$pull: {reactions: reaction._id}},
            {new: true}
        );

        if(!thought) {
            return res.status(404).json({message:"Reaction deleted. No thought found"});
        }

        return res.json({message: "Reaction deleted!"});

    } catch (err) {
        return res.status(500).json({message: err});
    }
})

module.exports = router;