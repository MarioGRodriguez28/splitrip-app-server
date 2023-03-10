const router = require("express").Router();
const User = require("../models/User.model.js")
const Group = require("../models/Group.model")

router.post("/group", async (req, res, next)=>{


    console.log(req.body)
    
    
    
    try {
    
    
        
        // Creará el grupo en la Base de Datos
         Group.create({
          groupName: groupName,
          
        })


    
        res.json("Grupo con exito")
    } catch (error) {
        next(error)
    }
    
    })