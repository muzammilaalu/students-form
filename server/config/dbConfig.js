import mongoose from "mongoose"

const connectDb = async() => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log("DB Connected Succussfull : " , conn.connection.name)
    }catch(error){
        console.log("Connection faild : ", error.message)
    }
}

export default connectDb