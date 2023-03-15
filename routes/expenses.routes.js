const router = require("express").Router();
const Expenses = require("../models/Expenses.model.js");
const esAutentificado = require("../middlewares/auth.middlewares.js")
// GET "/api/expenses/" => Lista de gastos
router.get("/", async (req, res, next) => {
  try {
    const response = await Expenses.find().select("");
    // console.log(response);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

//POST "/api/expenses/" =>  crear gastos
router.post("/", esAutentificado, async (req, res, next) => {
  // console.log( req.body)
  const {item, ammount, id_group} = req.body;
  const {_id} = req.payload 
  try {
    await Expenses.create({
      id_user: _id,
      ammount: ammount,
      item: item,
      id_group: id_group,
    });
    res.status(200).json(req.body);
  } catch (error) {
    next(error);
  }
});

// GET "/api/expenses/:expensesId" => detalles de los gastos
router.get("/:expensesId", async (req, res, next) => {
  console.log("adios", req.params);
  const {expensesId} = req.params;

  try {
    const response = await Expenses.findById(expensesId);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// DELETE "/api/expenses/:expensesId" => borrar un gasto por su ID
router.delete("/:expensesId", async (req, res, next) => {
  const {expensesId} = req.params;

  try {
    await Expenses.findByIdAndDelete(expensesId);
    res.json("todo bien, gasto borrado");
  } catch (error) {
    next(error);
  }
});

// PATCH "/api/expenses/:expensesId" => Actualizacion de gastos por ID
router.patch("/:expensesId", async (req, res, next) => {
  const {expensesId} = req.params;
  const {item, ammount} = req.body;

  try {
    await Expenses.findByIdAndUpdate(expensesId, {
      item,
      ammount,
    });

    res.json("todo bien, documento actualizado");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
