const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});
// const splitRoutes = require("./split.routes.js")
// router.use("/split", splitRoutes)

const authRoutes = require("./auth.routes.js")
router.use("/auth", authRoutes)




module.exports = router;
