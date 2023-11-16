const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, "El nombre es requerido"]
        },
        email:{
            type: String,
             required: [true, "El email es necesario"],
             match: [
                        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                        ,
                        "email no válido"
                    ]
        },
        role:{
            type:String,
            required: [true, "El rol es necesario"],
            enum:[
                "user",
                "publisher"
            ]
        },
        password:{
            type:String,
            required: [true, "La contraseña es requerida"],
            maxlength:[6, "Máximo 6 caracteres"],
            select: false
        },
        createAt:{
            type: Date,
            default: Date.now
        }
    }
)

//crear la acción pre
UserSchema.pre('save', async function(next) {
    //Crea la sal
    const sal = await bcryptjs.genSalt(10)
    //Enciptar contraseña
    this.password = await bcryptjs.hash(this.password, sal)

})



//metodo que construye el jwt
UserSchema.
    methods.
        ObtenerJWT = function(){
            const JWT_SECRET_KEY = "password_con_2_s"
            return jwt.sign({
                id: this._id,
            },
                JWT_SECRET_KEY,
                { 
                    expiresIn: Date.now() + 10000
                 } 
            )
        }

//metodo para comparar el password del body
//con el password de la entidad.

UserSchema.methods.comparePassword = 
                async function(password){
                
                //comparar ambos passwords
                return await bcryptjs.compare(password, 
                    this.password) 
}

const User=
mongoose.model('User', 
                UserSchema)

module.exports = mongoose.model('User', UserSchema )