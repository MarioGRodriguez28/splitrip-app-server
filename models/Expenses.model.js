const { Schema, model } = require('mongoose')

const expensesSchema = new Schema(
  {
    id_user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    item: {
      type: String,
    },
    ammount: {
      type: Number,
    },
    id_group: {
      type: Schema.Types.ObjectId,
      ref: 'Group',
    },
    date: {
      type: String,
    },
  },

  {
    timestamps: true,
  },
)

const Expenses = model('Expenses', expensesSchema)

module.exports = Expenses
