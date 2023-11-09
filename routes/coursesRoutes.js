const express = require('express')
const mongoose = require('mongoose')
const CourseModel = require('../models/CoursesModels');
const router = express.Router()

//evidencia: uris de cursos

    //traer todos los cursos
    router.get('/',
        async(request, response)=> {
            try {
                const  courses = 
                await CourseModel.find()

                if(courses.length === 0){
                    return response.
                       status(404).
                       json({
                           success: false, 
                           msg: "No hay cursos disponibles"
                       })
               }

                response
                    .status(200)
                    .json({
                        "success": true,
                        "results": courses
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
           
    //traer cursos por id
    router.get('/:id',
        async(request, response)=> {
            try {
                //Traer el parametro id de la URI
                const courseId =  request.params.id

                
                if (!mongoose.Types.ObjectId.isValid(courseId)) {
                    response
                        .status(500)
                        .json({
                            success: false, 
                            msg: `Identificador invalido`
                        })
                }else{
                    const selected_course = 
                    await CourseModel.findById(courseId)
                
                        if(!selected_course){
                            response
                                .status(404)
                                .json({
                                    success: false, 
                                    msg: `No existe un curso con el id ${courseId}`
                                })
                        }else{
                            response
                                .status(200)
                                .json({
                                    "success": true,
                                    "results": selected_course
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

    //crear cursos
    router.post('/',
        async(request, response)=> {
            try {
                const course_create = 
                await CourseModel.create( request.body) 

                response
                .status(201)
                .json({
                    "success": true,
                    "data":  course_create
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

      //Actualizar cursos
      router.put('/:id',
        async(request, response)=> {
            try {
                courseId =  request.params.id


                if (!mongoose.Types.ObjectId.isValid(courseId)) {
                    response
                        .status(500)
                        .json({
                            success: false, 
                            msg: `Identificador invalido`
                        })
                }
                else
                {
                    const course_update =
                    await CourseModel.findByIdAndUpdate(
                        courseId,
                        request.body,
                        {
                            new: true 
                        }
                    )
                        if(!course_update){
                            response
                                .status(404)
                                .json({
                                    success: false, 
                                    msg: `No existe un course con el id ${courseId}`
                                })
                        }else{
                            response
                                .status(200)
                                .json({
                                    "success": true,
                                    "results": course_update
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

  //Eliminar cursos
  router.delete('/:id',
      async(request, response)=> {
        try {
            courseId =  request.params.id
            
            if (!mongoose.Types.ObjectId.isValid(courseId)) {
                response
                    .status(500)
                    .json({
                        success: false, 
                        msg: `Identificador invalido`
                    })
            }
            else
            {
                const course_delete =
                await CourseModel.findByIdAndDelete(
                    courseId,
                    request.body,
                    {
                        new: true 
                    }
                )
                    if(!course_delete){
                        response
                            .status(404)
                            .json({
                                success: false, 
                                msg: `No existe un course con el id ${courseId}`
                            })
                    }else{
                        response
                            .status(200)
                            .json({
                                "success": true,
                                "results": course_delete
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