const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/^\w+@\w+\.\w{2,20}$/,"Must be valid email address"]
    },
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: 'Thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User' 
    }]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);
userSchema.virtual('friendCount').get(function () {
    return this.friends.length
})
const User = model('User', userSchema);

module.exports = User;
