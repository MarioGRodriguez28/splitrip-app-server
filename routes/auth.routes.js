const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User.model.js')
const jwt = require('jsonwebtoken')
const esAutentificado = require('../middlewares/auth.middlewares.js')

// POST /api/auth/signup - Ruta para registrarnos
router.post('/signup', async (req, res, next) => {
  console.log(req.body)

  //1.VALIDACION DE BACKEND
  const { username, password } = req.body
  // - Chequear que no este el campo vacio
  if (!username || !password) {
    res.status(400).json({ errorMessage: 'Debes rellenar todos los campos' })
    return
    // Esto dentendrá la funcion al llegar a return
  }
  // Agregar validaciones de contraseña
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?-]).{8,}$/
  if (!passwordRegex.test(password)) {
    res.status(400).json({
      errorMessage:
        'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial',
    })
    return
  }

  try {
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
    console.log(hashPassword)

    // Creará el documento de usuario en la BD
    await User.create({
      username: username,
      password: hashPassword,
    })

    res.json('todobien todo Ok 2')
  } catch (error) {
    next(error)
  }
})

// POST /api/auth/login - Ruta para acceder

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body

  console.log(username, password)

  try {
    // Verificamos que el usuario exista en la base de datos
    const foundUser = await User.findOne({ username: username })
    if (!foundUser) {
      res.status(400).json({ errorMessage: '¡Credenciales Incorrectos!' })
      return
    }

    //Comprobacion de contraseña correcta

    const correctPassword = await bcrypt.compare(password, foundUser.password)
    if (!correctPassword) {
      res.status(400).json({ errorMessage: '¡Credenciales Incorrectos!' })
      return
    }

    const payload = {
      _id: foundUser._id,
      username: foundUser.username,
    }
    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: 'HS256',
      expiresIn: '1d',
    })

    res.status(200).json({ authToken: authToken })
  } catch (error) {
    next(error)
  }
})

// GET /api/auth/verify - Ruta para verificacion
router.get('/verify', esAutentificado, (req, res, next) => {
  console.log(req.payload)
  res.status(200).json(req.payload)
})

// GET /api/users - Ruta para obtener todos los usuarios
router.get('/users', async (req, res, next) => {
  try {
    const userList = await User.find()
    res.status(200).json(userList)
  } catch (error) {
    next(error)
  }
})

// POST /api/auth/addToUserGroups - Ruta para agregar usuario a grupo
router.post('/addToUserGroups', esAutentificado, async (req, res, next) => {
  const { username, groupName } = req.body

  try {
    await addToUserGroupsService(username, groupName)
    res.status(200).json({ message: 'Usuario agregado al grupo correctamente' })
  } catch (error) {
    next(error)
  }
})

// POST /api/auth/user/addGroups - Ruta para añadir grupos a un usuario
router.post('/user/addGroups', esAutentificado, async (req, res, next) => {
  const { username, groups } = req.body

  try {
    // Buscamos el usuario en la base de datos
    const user = await User.findOne({ username: username })

    if (!user) {
      res.status(400).json({ errorMessage: 'Usuario no encontrado' })
      return
    }

    // Añadimos los grupos al usuario
    user.groups = groups

    // Guardamos el usuario actualizado en la base de datos
    await user.save()

    res.status(200).json({ message: 'Grupos añadidos correctamente' })
  } catch (error) {
    next(error)
  }
})

module.exports = router
