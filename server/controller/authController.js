import User from "../model/authModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const registerUser = async(req, res) => {
    
    const { name, email, phone, password,  } = req.body

    if(!name || !email || !phone || !password ){
        res.status(409)
        throw new Error("Please Fill All Details ")
    }

    const existEmail = await User.findOne({email})
    const existPhone = await User.findOne({phone})


    if(existEmail || existPhone){
        res.status(409)
        throw new Error("User Already Exist ! ")
    }

    let salt = bcrypt.genSaltSync(10)
    let hashPassword = bcrypt.hashSync(password, salt)

    const user = await User.create({
        name: name,
        email: email,
        phone: phone,
        password: hashPassword
    })

    if(!user){
        res.status(409)
        throw new Error("User Not Created ! ")
    }else{
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            isActive: user.isActive,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)

        })
    }

}

const loginUser = async(req, res) => {
    
    const { email, password } = req.body

    if( !email || !password){
        res.status(409)
        throw new Error("please fill All Details !")
    }

    const user = await User.findOne({email})
    if(user && bcrypt.compareSync(password, user.password)){
        res.status(200).json({
            name: user.name,
            email: user.email,
            phone: user.phone,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }else{
        res.status(409)
        throw new Error("Invalid Credentials")
    }
}

//genrate token
const generateToken = (id) => {
    let token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
    return token
}

const authController = {registerUser, loginUser}

export default authController