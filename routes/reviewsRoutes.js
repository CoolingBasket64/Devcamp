const express = require('express')
const mongoose = require('mongoose')
const ReviewModel = require('../models/ReviewsModels');
const router = express.Router()

//evidencia: uris para reviews
    //traer todos los reviews
    router.get('/',
        async(request, response)=> {
            try {
                const  reviews = 
                await ReviewModel.find()

                if(reviews.length === 0){
                    return response.
                       status(404).
                       json({
                           success: false, 
                           msg: "No hay reseñas disponibles"
                       })
               }

                response
                    .status(200)
                    .json({
                        "success": true,
                        "results": reviews
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

    //traer reviews por id
    router.get('/:id',
        async(request, response)=> {
            try {
                //Traer el parametro id de la URI
                const reviewId =  request.params.id

                
                if (!mongoose.Types.ObjectId.isValid(reviewId)) {
                    response
                        .status(500)
                        .json({
                            success: false, 
                            msg: `Identificador invalido`
                        })
                }else{
                    const selected_review =
                    await ReviewModel.findById(reviewId)
                
                        if(!selected_review){
                            response
                                .status(404)
                                .json({
                                    success: false, 
                                    msg: `No existe una reseña con el id ${reviewId}`
                                })
                        }else{
                            response
                                .status(200)
                                .json({
                                    "success": true,
                                    "results": selected_review
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
        })
           
    

    //crear reviews
    router.post('/',
    async(request, response)=> {
        try {
            const review_create = 
            await ReviewModel.create( request.body) 

            response
            .status(201)
            .json({
                "success": true,
                "data":  review_create
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

    //Actualizar review
    router.put('/:id',
    async(request, response)=> {
        try {
            reviewId =  request.params.id


            if (!mongoose.Types.ObjectId.isValid(reviewId)) {
                response
                    .status(500)
                    .json({
                        success: false, 
                        msg: `Identificador invalido`
                    })
            }
            else
            {
                const review_update =
                await ReviewModel.findByIdAndUpdate(
                    reviewId,
                    request.body,
                    {
                        new: true 
                    }
                )
                    if(!review_update){
                        response
                            .status(404)
                            .json({
                                success: false, 
                                msg: `No existe una reseña con el id ${reviewId}`
                            })
                    }else{
                        response
                            .status(200)
                            .json({
                                "success": true,
                                "results": review_update
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

  //Eliminar reviews
  router.delete('/:id',
  async(request, response)=> {
    try {
        reviewId =  request.params.id
        
        if (!mongoose.Types.ObjectId.isValid(reviewId)) {
            response
                .status(500)
                .json({
                    success: false, 
                    msg: `Identificador invalido`
                })
        }
        else
        {
            const review_delete =
            await ReviewModel.findByIdAndDelete(
                reviewId,
                request.body,
                {
                    new: true 
                }
            )
                if(!review_delete){
                    response
                        .status(404)
                        .json({
                            success: false, 
                            msg: `No existe una reseña con el id ${reviewId}`
                        })
                }else{
                    response
                        .status(200)
                        .json({
                            "success": true,
                            "results": review_delete
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