const { Schema, model } = require('mongoose')

const expensesSchema = new Schema(
  {
    Id_user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    item: {
      type: String,
    },
    ammount: {
      type: Number,
    },
    Id_group: {
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
