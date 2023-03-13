const { Schema, model } = require("mongoose");


const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true],
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: [false],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    group: [
      {
        type: String
      }
    ]
  },
  {
       
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
