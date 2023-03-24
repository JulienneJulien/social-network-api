const { User, Thought } = require("../models");

// ADDED REQUIREMENT - get all thoughts
module.exports = {
    getAllThoughts(req, res) {
        Thought.find({})
          .then((thought) => res.json(thought))
          .catch((err) => res.status(500).json(err));
},

// ADDED REQUIREMENT - get a single thought
getOneThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: `No thought found with that ID` })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};