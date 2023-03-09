const router = require("express").Router();
const bcrypt = require('bcryptjs');
const User = require("../models/User.model.js")
// POST /api/auth/signup - Ruta para registrarnos
router.post("/signup", async (req, res, next)=>{


console.log(req.body)




//1.VALIDACION DE BACKEND
const { username, password } = req.body
  // - Chequear que no este el campo vacio
  if (!username || !password) {
    res.status(400).json({ errorMessage: "Debes rellenar todos los campos" })
    return;
    // Esto dentendrá la funcion al llegar a return
  }
try {
    
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
    console.log(hashPassword)
    
    // Creará el documento de usuario en la BD
    await User.create({
      username: username,
      password: hashPassworda
    })


    
    res.json("todobien todo Ok 2")
} catch (error) {
    next(error)
}

})



router.post("/login", async (req,res,next)=>{

const {username , password} = req.body

console.log(username, password)

try {

    // Verificamos que el usuario exista en la base de datos
    const foundUser = await User.findOne({ username: username })
    if (!foundUser) {
      res.status(400).json({ errorMessage: "¡Credenciales Incorrectos!" })
      return;
    }

    //Comprobacion de contraseña correcta 

    const correctPassword = await bcrypt.compare(password, foundUser.password)
    if (!correctPassword) {
      res.status(400).json({ errorMessage: "¡Credenciales Incorrectos!" })
      return;
    }
} catch (error) {
    next(error)
}

})

module.exports = router;