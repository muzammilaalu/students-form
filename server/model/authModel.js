import mongoose from "mongoose"

const userSchema =  mongoose.Schema({

    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
    },
    phone: {
        type: Number,
        require: [true, "Please Enter 10 Digit Number"],
    },
    password:{
        type: String,
        require: true
    },
    isAdmin: {
        type: Boolean,
        require: false,
        default: false
    }
},{
    timestamps: true
})

const User = mongoose.model("User", userSchema)

export default User