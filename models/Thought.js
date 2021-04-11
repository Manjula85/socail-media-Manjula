const {Schema, model} = require('mongoose');
const dateFormat = require("../utils/dateFormat");

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt:{
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    username:{
        type: String,
        required: true
    },
    reactions: []
},
{
    toJSON:{
        getters: true,
        virtuals: true
    }
}
);

thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
  });

// create Pizza model
const Thought = model('Thought',thoughtSchema);

//export the User model
module.exports = Thought;