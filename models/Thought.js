const { Schema, model, Types } = require("mongoose");

// THOUGHT SCHEMA ADDED
const thoughtSchema = new Schema(
    {
      thoughtText: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 279,
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
    },
)
  