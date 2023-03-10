const router = require("express").Router();
const Expenses = require("../models/Expenses.model.js")

// GET "/api/split" 
router.get("/", async (req, res, next) => {
    const response = await Expenses.find().select("item")
  console.log("esto es un item", response)
  res.json(response)


  })



module.exports = router;
