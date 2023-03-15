const mongoose = require('mongoose')

const groupSchema = new mongoose.Schema(
  {
    Id_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    groupName: {
      type: String,
    },
    members: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
)

const Group = mongoose.model('Group', groupSchema)

module.exports = Group
