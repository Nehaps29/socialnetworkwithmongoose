const { Schema, model } = require('mongoose');
const reactionSchema = require("./Reaction")
// Schema to create User model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength:280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get:  timeStamp => new Date (timeStamp).toLocaleString()
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
})
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
