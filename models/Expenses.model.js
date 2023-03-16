const mongoose = require('mongoose')

const expensesSchema = new mongoose.Schema(
  {
    id_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    item: {
      type: String,
    },
    ammount: {
      type: Number,
    },
    id_group: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Group',
    },
    // date: {
    //   type: String,
    // },
  },

  {
    timestamps: true,
  },
)

const Expenses = mongoose.model('Expenses', expensesSchema)

module.exports = Expenses
