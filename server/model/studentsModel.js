import mongoose from "mongoose"

const studentSchema =  mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    profileImage :{
        type: String,
        required : true
    }
},{
    timestamps: true
})


const Student = mongoose.model('Student', studentSchema)

export default Student