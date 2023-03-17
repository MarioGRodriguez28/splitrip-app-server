const router = require('express').Router()
const Group = require('../models/Group.model')
const esAutentificado = require('../middlewares/auth.middlewares')

router.post('/', esAutentificado, async (req, res, next) => {
  console.log(req.body)
  const { groupName } = req.body
  const { members } = req.body

  if (!groupName) {
    res.status(400).json({ errorMessage: 'Debes rellenar todos los campos' })
    return
  }
  const { _id } = req.payload
  try {
    // Creará el grupo en la Base de Datos
    const response = await Group.create({
      groupName: groupName,
      members: members,
      Id_user: _id,
    })

    res.json(response)
  } catch (error) {
    next(error)
  }
})
router.get('/', esAutentificado, async (req, res, next) => {
  const userId = req.payload._id

  try {
    const groups = await Group.find({ members: userId }).select('groupName')
    res.json(groups)
  } catch (error) {
    next(error)
  }
})

// Entrar al grupo y ves sus detalles
router.get('/:groupId', async (req, res, next) => {
  console.log(req.params)
  const { groupId } = req.params

  try {
    const response = await Group.findById(groupId).populate('members')
    console.log(response)
    res.json(response)
  } catch (error) {
    next(error)
  }
})

// DELETE "/api/:groupId" => borrar un Todo por su id
router.delete('/:groupId', async (req, res, next) => {
  const { groupId } = req.params

  try {
    await Group.findByIdAndDelete(groupId)
    res.json('Genial, Grupo borrado')
  } catch (error) {
    next(error)
  }
})

// Actualiza Grupo - Se recibe por Id y se actualiza ( Esta ruta debe ser tipo Patch)
router.patch('/:groupId', async (req, res, next) => {
  const { groupId } = req.params
  const { groupName } = req.body
  const { members } = req.body
  try {
    await Group.findByIdAndUpdate(groupId, {
      groupName,
      members,
    })

    res.json('Se ha actualizado el nombre del grupo correctamente')
  } catch (error) {
    next(error)
  }
})

module.exports = router
