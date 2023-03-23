const { Schema, model, Types } = require("mongoose");

// THOUGHT SCHEMA ADDED
const thoughtSchema = new Schema(
    {
      thoughtText: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 280,
      },
//ADDED REQUIREMENT - DATE & timestamp added
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) =>
          moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
      },

      username: {
        type: String,
        required: true,
      },
      reactions: [reactionSchema],
    },

    {
      toJSON: {
        virtuals: true,
        getters: true,
      },
      id: false,
    },
)

//ADDED REQUIREMENT - a virtual called reactionCount that retrieves the length of the thought's reactions array field on query was created

thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
  });

    // Model created
    const Thought = model('Thought', thoughtSchema);
    // Model export
    module.exports = Thought;