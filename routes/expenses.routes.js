const router = require("express").Router();
const Expenses =require("../models/Expenses.model.js")



// GET "/api/expenses/" => Lista de gastos
router.get("/", async (req, res, next) => {
    try {
      const response = await Expenses.find().select("")
      console.log("Hola", response)
      res.json(response)
    } catch (error) {
      next(error)
    }
  })


//POST "/api/expenses/create" crear gastos
router.post("/", async (req,res,next)=>{
    // console.log("Hola", req.body)
    const { ammount, item } = req.body

    try {
        await Expenses.create({
            
            ammount: ammount,
            item: item
          })
          res.status(200).json()
    } catch (error) {
        next(error)
    }

})












module.exports = router;