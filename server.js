//Dependecia commonJS
const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')

//DEPENDENCIA DE RUTAS
const bootcampRoutes = require('./routes/bootcampRoutes')
const coursesRoutes = require('./routes/coursesRoutes')
const reviewsRoutes = require('./routes/reviewsRoutes')
const userRoutes = require('./routes/userRoutes')


//DEPENDENCIA PARA CONEXION
const conectDB = require('./config/db')

//Establecer archivo .env del proyecto
dotenv.config({
    path: './config/.env'
})

conectDB()

//Crear el objeto app
const app = express()

//express para recibir datos json
app.use(express.json())

//Vincular las rutas de bootcamps
app.use('/api/v1/devcamp-2687351/bootcamps', bootcampRoutes)
//Vincular las rutas de courses
app.use('/api/v1/devcamp-2687351/cursos', coursesRoutes)
//Vincular las rutas de reviews
app.use('/api/v1/devcamp-2687351/reviews', reviewsRoutes)
//Vincular las rutas de user
app.use('/api/v1/devcamp-2687351/auth', userRoutes)


//primera prueba de URL del servidor
app.get('/prueba', 
    function(request, response){
        response.send("Holaaaaa");    
});

//-----------------------------------------------------------------------------------------------------------------------------------

//evidencia: uris para users

    //traer todos los users
    app.get('/api/v1/devcamp-2687351/users',
    (request, response)=> {
        response
                .status(200)
                .json({
                    "success": true,
                    "msg": "Mostrar todos los users"
                })
    });

    //traer user por id
    app.get('/api/v1/devcamp-2687351/users/:id',
    (request, response)=> {
        response
                .status(200)
                .json({
                    "success": true,
                    "msg": `seleccionando user con id: ${request.params.id}`
                })
    });

    //crear users
    app.post('/api/v1/devcamp-2687351/users',
    (request, response)=> {
        response
                .status(201)
                .json({
                    "success": true,
                    "msg": "Crear user"
                })
    });

    //Actualizar users
    app.put('/api/v1/devcamp-2687351/users/:id',
    (request, response)=> {
    response
            .status(200)
            .json({
                "success": true,
                "msg": `user con id: ${request.params.id} actualizado`
            })
    });

    //Eliminar users
    app.delete('/api/v1/devcamp-2687351/users/:id',
    (request, response)=> {
    response
            .status(200)
            .json({
                "success": true,
                "msg": `user con id: ${request.params.id} eliminado`
            })
    });

//Establecer servidor
const PUERTO = process.env.EXPRESS_PORT
app.listen(PUERTO, 
    console.log(`Servidor escuchado en el puerto: ${PUERTO}`.bgBlue.green))
