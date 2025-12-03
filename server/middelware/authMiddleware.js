import jwt from "jsonwebtoken"
import User from "../model/authModel.js"

const forAuthUser = async (req, res, next) => {
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            let token = req.headers.authorization.split(' ')[1]
            let decoded = jwt.verify(token, process.env.JWT_SECRET)
            let user = await User.findById(decoded.id).select("-password")
            req.user = user
            next()
        } else {
            res.status(400)
            throw new Error("Unauthorized User : Valid Token Needed")
        }
    } catch (error) {
        res.status(400)
        throw new Error("Unauthorized User : Valid Token Needed")
    }
}

const forAdmin = async(req, res, next) => {
    try {
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            let token = req.headers.authorization.split(" ")[1]
            let decode = jwt.verify(token, process.env.JWT_SECRET)
            let user = await User.findById(decode.id).select("-password")
            if(user.isAdmin){
                req.user = user
                next()
            }
        }
    } catch (error) {
    
        res.status(400)
        throw new Error("Unauthorized User : Valid Token Needed")
        
    }
}

const protect = { forAuthUser, forAdmin}

export default protect