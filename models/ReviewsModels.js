const mongoose = require('mongoose')

//Definir el modelo para reviews

const ReviewsSchema = mongoose.Schema({
    title:{
        type: String,
        unique: [ true , "El nombre de la reseña debe ser único"],
        required: [ true, "Nombre de reseña requerido"],
        maxlength: [20, "Longitud de caracteres debe ser menor a 20"],
    },
    text:{
        type: String,
        required: [ true, "Texto requerido"],
        maxlength: [50, "Longitud de caracteres debe ser menor a 50"],
    },
    rating:{
        type: Number,
        min: [1, "Puntuación minima de 1"],
        max: [10, "Puntuación máxima de 10"],
        required: [true, "Calificación requerida"]
    }

    

})

module.exports = mongoose.model('Reviews', ReviewsSchema )