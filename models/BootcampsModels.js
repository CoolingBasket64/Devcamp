const mongoose = require('mongoose')

//Definir el modelo para bootcamps

const BootcampSchema = mongoose.Schema({
    name:{
        type: String,
        unique: [ true , "El nombre del bootcamp debe ser único"],
        required: [ true, "Nombre de bootcamp requerido"],
        maxlength: [50, "Longitud de nombre menor a 50"]
    },
    phone:{
        type: Number,
        maxlength: [10, "Longitud de nombre menor a 10"],
        required: [ true, "Teléfono requerido"],
    },
    address:{
        type: String,
        required: [ true, "Dirección requerida"],
    },
    topics:{
        type: [String],
        enum: [
            "AI" ,
            "Frontend/UX" ,
            "Backend",
            "DevOps"
        ],
        required: [ true, " Tema requerido"],
    },
    averageRating: Number,
    createAt: Date
})

module.exports = mongoose.model('Bootcamps', BootcampSchema )