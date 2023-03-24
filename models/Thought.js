const { Schema, model, Types } = require("mongoose");
  // Model created

  //   Reaction (SCHEMA ONLY)
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },

    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },

    username: {
      type: String,
      required: true,
    },
   //ADDED REQUIREMENT - DATE & timestamp added
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) =>
        moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

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


  
  const Thought = model('Thought', thoughtSchema);
  
    // Model export
    module.exports = Thought;