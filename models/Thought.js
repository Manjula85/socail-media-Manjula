const { Schema, model, Types } = require("mongoose");
const moment = require('moment');

// REACTION - SCHEMA ONLY

const ReactionSchema = new Schema(
  {
    //set custom id
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: moment().format('dddd MMM YYYY') 
      //get: (createdAtVal) => dateFormat(createdAtVal),
    },
  }
);

//THOUGHT

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: moment().format('dddd MMM YYYY') 
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false
  }
);

ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// create Pizza model
const Thought = model("Thought", ThoughtSchema);

//export the User model
module.exports = Thought;
//module.exports = Reaction;
