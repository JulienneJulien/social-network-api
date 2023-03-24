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

// ADDED REQUIREMENT - Created a thought
createThought(req, res) {
    Thought.create(req.body)
      .then(({_id}) => {
        return User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: { thoughts: _id } },
            { new: true }
          );
        })
        .then((thought) =>
        !thought
        ? res.status(404).json({ message: `Added new thought` })
        : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
        },
// ADDED REQUIREMENT - Updated existing thought
updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, New: true }
    )
    .then((user) =>
    !user
      ? res.status(404).json({ message: `No thought found with that ID` })
      : res.json(user)
  )
  .catch((err) => res.status(500).json(err));
},
  // ADDED REQUIREMENT - deleted a single thought
  deleteOneThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: `No thought found with that ID` })
              : User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
              )
        )
        .then((user) =>
            !user
            ? res
                .status(404)
                .json({ message: `Deleted a thought (without User)` })
            : res.json({ message: `Deleted a thought` })
            )
            .catch((err) => res.status(500).json(err));
            }, 

        };