import multer from "multer"
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, `photo-${crypto.randomUUID()}.${file.originalname.split(".")[1]}`)
    }
})

const upload = multer({ storage: storage })


export default upload

























// const multer = require('multer')

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads/")
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname)
//     }
// })



// const upload = multer({ storage: storage })


// module.exports = upload