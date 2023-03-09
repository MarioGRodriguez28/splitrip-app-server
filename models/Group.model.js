const { Schema, model } = require('mongoose')

const groupSchema = new Schema(
  {
    Id_user: {
      type: Schema.Types.ObjectId,
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

const Group = model('Group', groupSchema)

module.exports = Group
