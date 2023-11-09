const mongoose = require('mongoose')

//Definir el modelo para cursos

const CoursesSchema = mongoose.Schema({
    title:{
        type: String,
        unique: [ true , "El nombre del curso debe ser único"],
        required: [ true, "Nombre de curso requerido"],
        minlength: [10, "Longitud de nombre debe ser mayor a 10"],
        maxlength: [30, "Longitud de nombre debe ser menor a 30"]
    },
    description:{
        type: String,
        minlength: [10, "Longitud de descripción debe ser mayor a 10"],
        required: [ true, "Descripción del curso requerida"],
    },
    weeks:{
        type: Number,
        max: [9, "Longitud de semanas debe ser menor a 9"],
        required: [ true, "Número de semanas requerido"],
    },
    enroll_cost:{
        type: Number,
        required: [true, "Costo de la inscripción requerido"]
    },
    minimumSkill:{
        type: String,
        enum: [
        "Beginner" ,
        "Intermediate" ,
        "Advanced",
        "Expert"
        ],
        required: [true, "Nivel requerido"]
    },
})

module.exports = mongoose.model('Courses', CoursesSchema )