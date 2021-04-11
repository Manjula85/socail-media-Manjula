const {Schema, model} = require('mongoose');
const dateFormat = require("../utils/dateFormat");

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody:{
        type: String,
        required: true,
        maxLength: 280
    },
    username:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    }
},
{
    toJSON:{
        getters: true,
        //virtuals: true
    }
});

//??? not sure

// create Pizza model
const Reaction = model('Reaction',reactionSchema);

//export the User model
module.exports = Reaction;