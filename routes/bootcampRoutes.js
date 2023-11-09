const express = require('express')
const mongoose = require('mongoose')
const BootcampModel = require('../models/BootcampsModels');
const router = express.Router()

//uris de bootcamps

    //traer todos los bootcamps
    router.get('/',
        async(request, response)=> {
            try {
                //traer todos los bootcamps
                const  bootcamps = 
                await BootcampModel.find()

                if(bootcamps.length === 0){
                     return response.
                        status(404).
                        json({
                            success: false, 
                            msg: "No hay bootcamps disponibles"
                        })
                }

                response
                    .status(200)
                    .json({
                        "success": true,
                        "results": bootcamps
                    })

            } catch (error) {
                response
                    .status(500)
                    .json({
                        success: false, 
                        msg: "Error interno de servidor"
                    })
            }
        
        });

    //traer bootcamp por id
    router.get('/:id',
        async(request, response)=> {
            try {
                //Traer el parametro id de la URI
                const bootcampId =  request.params.id
                
             
                if (!mongoose.Types.ObjectId.isValid(bootcampId)) {
                    response
                        .status(500)
                        .json({
                            success: false, 
                            msg: `Identificador invalido`
                        })
                }else{
                    const selected_bootcamp = 
                    await BootcampModel.findById(bootcampId)
                
                        if(!selected_bootcamp){
                            response
                                .status(404)
                                .json({
                                    success: false, 
                                    msg: `No existe un bootcamp con el id ${bootcampId}`
                                })
                        }else{
                            response
                                .status(200)
                                .json({
                                    "success": true,
                                    "results": selected_bootcamp
                                })
                        }
                }

                
            } catch (error) {
                response
                .status(500)
                .json({
                    success: false, 
                    msg: error.message
                })
            }
            
        });

    //crear bootcamp
    router.post('/',
         async (request, response)=> {
            try {
                //crear el nuevo bootcamp
                const bootcamp_create = 
                await BootcampModel.create( request.body )
            
                response
                    .status(201)
                    .json({
                        "success": true,
                        "data":  bootcamp_create
                    })

            } catch (error) {
                response
                    .status(500)
                    .json({
                        success: false, 
                        msg: error.message
                    })
            }
            
        });

    //Actualizar bootcamps
    router.put('/:id',
        async(request, response)=> {
            try {
                bootcampId = request.params.id

                if (!mongoose.Types.ObjectId.isValid(bootcampId)) {
                    response
                        .status(500)
                        .json({
                            success: false, 
                            msg: `Identificador invalido`
                        })
                }
                else
                {
                    const bootcamp_update =
                    await BootcampModel.findByIdAndUpdate(
                        bootcampId,
                        request.body,
                        {
                            new: true 
                        }
                    )
                        if(!bootcamp_update){
                            response
                                .status(404)
                                .json({
                                    success: false, 
                                    msg: `No existe un bootcamp con el id ${bootcampId}`
                                })
                        }else{
                            response
                                .status(200)
                                .json({
                                    "success": true,
                                    "results": bootcamp_update
                                }) 
                        }
                }  

                
            } catch (error) {
                    response
                    .status(500)
                    .json({
                        success: false, 
                        msg: error.message
                    })
            }
            
            
        });

    //Eliminar bootcamps
    router.delete('/:id',
        async (request, response)=> {
            try {
                bootcampId =  request.params.id
                if (!mongoose.Types.ObjectId.isValid(bootcampId)) {
                    response
                        .status(500)
                        .json({
                            success: false, 
                            msg: `Identificador invalido`
                        })
                }
                else
                {
                    const bootcamp_delete = 
                    await BootcampModel.findByIdAndDelete(
                        bootcampId,
                        {
                            new: true 
                        }
                    )
                        if(!bootcamp_delete){
                            response
                                .status(404)
                                .json({
                                    success: false, 
                                    msg: `No existe un bootcamp con el id ${bootcampId}`
                                })
                        }else{
                            response
                                .status(200)
                                .json({
                                    "success": true,
                                    "results": bootcamp_delete
                                }) 
                        }
                }  
            } catch (error) {
                response
                    .status(500)
                    .json({
                        success: false, 
                        msg: error.message
                    })
            }
            
        });

module.exports = router