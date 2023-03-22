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

      username: {
        type: String,
        required: true,
      },
    },
)
  