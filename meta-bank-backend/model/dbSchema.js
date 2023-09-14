const Mongoose = require('mongoose')

const userSchema = new Mongoose.Schema({

    username:{
        type:String,
        required:true,
        trim:true
    },
    nid:{
        type:Number,
        required:true,
        trim:true
    },
    balance:{
        type:Number,
        required:true,
        trim:true
    },
    history:[
        {
        date:{
            type:String
        },
        action:{
            type:String,
            required:true,
            trim:true
        },
        amount:{
            type:Number,
            required:true,
            trim:true
        },
        status:{
            type:String,
        }
        }
    ]
}
)

const userModel = Mongoose.model('customers',userSchema)

module.exports = userModel