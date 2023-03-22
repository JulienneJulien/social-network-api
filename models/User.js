const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
      },
          email: {
        type: String,
        required: true,
        unique: true,
        // ADDED REQUIREMENT - Must match a valid email address (look into Mongoose's matching validation)
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please enter a correct email address",
        ],
           },

        thoughts: [
            {
              type: Schema.Types.ObjectId,
              ref: "Thought",
            },
          ],

          friends: [
            {
              type: Schema.Types.ObjectId,
              ref: "User",
            },
          ],
        },
        {
          toJSON: {
            virtuals: true,
          },
          id: false,
        }
      );

    //   ADDED REQUIREMENT - a virtual called friendCount that retrieves the length of the user's friends array field on query was created
      userSchema.virtual("friendCount").get(function () {
        return this.friends.length;
    });

    // Model created
    const User = model('User', userSchema);
    // Model export
    module.exports = User;