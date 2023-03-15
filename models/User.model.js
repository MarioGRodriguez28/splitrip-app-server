const { Schema, model } = require("mongoose");


const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

   

    password: {
      type: String,
      required: true
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
