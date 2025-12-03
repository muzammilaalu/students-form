import express from "express"
import studentController from "../controller/studentController.js"
import upload from "../middelware/middelwares.js" 
import protect from "../middelware/authMiddleware.js"

const router = express.Router()

router.get("/", protect.forAdmin,studentController.getStudents)

router.post("/" ,protect.forAuthUser, upload.single('profileImage') ,studentController.addStudent)

router.put("/:id",protect.forAuthUser,studentController.updateStudent)

router.get("/:id",protect.forAdmin,studentController.getStudent)

router.delete("/:id",protect.forAdmin,studentController.removeStudent)


export default  router
