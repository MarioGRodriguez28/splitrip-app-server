const router = require("express").Router();
const Group = require("../models/Group.model");

router.post("/", async (req, res, next) => {
  console.log(req.body);
  const {  groupName } = req.body

  try {
    // Creará el grupo en la Base de Datos
   await Group.create({
      groupName: groupName
    });

    res.json(`Grupo ${groupName} creado correctamente`);
  } catch (error) {
    next(error);
  }
});
module.exports = router;