const { Schema, model } = require("mongoose");

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
      unique: true,
      match: [/.+\@.+\..+/],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [], //self reference??
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false
  }
);

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// create Pizza model
const User = model("User", userSchema);

//export the User model
module.exports = User;
