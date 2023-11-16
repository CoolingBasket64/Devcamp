const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const UsersModel = require('../models/UsersModel');


router.post('/register', 
            async(req, res) => {
                const{ name, email, password, role} = req.body
                try {
                    const user = 
                        await UsersModel.create({
                            name,
                            email,
                            role,
                            password
                        })
                    res
                        .status(201)
                        .json({
                            success : true, 
                            msg: "Usuario registrado correctamente",
                            token: user.ObtenerJWT()
                        })
            
                } catch (error) {
                     res
                        .status(400)
                        .json({
                            success: false, 
                            msg: error.message
                        })
                }  
               
            })

router.post('/login', async(req, res) => {
    //desestructuracion:
    //- objetos
    //- arreglos
    const{email, password} = req.body;
    //si no llega email o password
    if (!email || !password) {
        res.status(400).json({
            success:false,
            message: "Debe ingresar email o password"
        })
    }else {
        try {
            //encontrar usuario que tenga el password y el email
            const user = await UsersModel
                                .findOne({email})
                                .select("+password")
            //console.log(user)
            if (!user) {
                res.
                status(400).
                json({
                    success:false,
                    message: "No se encontro el usuario"
                })  
            } else{
             //utilizar el método de comparar el email
                const isMatch = await user.comparePassword(password)
                if(!isMatch){
                    res.status(400).json({
                        success: false,
                        message:"Contraseña incorrecta"
                    })
                }else{
                    res.status(201).json({
                        success: true,
                        message:"datos validos",
                        token: user.ObtenerJWT()
                    })
                }

            }
        } catch (error) {
            
        }
    }
})

module.exports = router