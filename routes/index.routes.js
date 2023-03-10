const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});
// const splitRoutes = require("./split.routes.js")
// router.use("/split", splitRoutes)

const authRoutes = require("./auth.routes.js")
router.use("/auth", authRoutes)




const groupRoutes = require("./groups.routes.js")
router.use("/groups", groupRoutes)

const expensesRoutes = require("./expenses.routes.js")
router.use("/expenses", expensesRoutes)

module.exports = router;
