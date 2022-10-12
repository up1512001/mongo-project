const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UsersSchema = new Schema(({
    email:{
        type:String,
        required : true,
        unique:true
    },
    name:{
        type:String
    },
    phoneNumber:{
        type:String
    },
    address:{
        type:String
    },
    city:{
        type:String
    },
    state:{
        type:String
    },
    country:{
        type:String
    },
    isBuyer:{
        type:Boolean,
        default:false
        
    },
    isSeller:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date
    },
    updatedAt:{
        type:Date
    }
}))

module.exports = Users = mongoose.model('Users',UsersSchema)