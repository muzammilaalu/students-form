import Student from "../model/studentsModel.js"



const getStudents = async(req, res) => {
    let students = await Student.find()

    if(!students){
        res.status(404)
        res.json({
            message: "Students Not Found!"
        })
    }

    res.status(200)
    res.json(students)


    res.send("All Students")
}

const addStudent = async (req, res) => {
   const {name , email , age , course  } = req.body 

  if(!name || !email || !age || !course ){
    res.status(400)
    res.json({
      msg : " fill all details "
    })
  }

  console.log(req?.file?.path)

  const newstudent = await Student.create({
    name , email , course , profileImage: req.file.path , age 
  }) 


  if(!newstudent){
    res.status(404)
    res.json({
      msg : "student is not paid"
    })
  }

  res.status(200)
  res.json(newstudent)


  res.json("api working")

}

const getStudent =async (req, res) => {

  let student = await Student.findById(req.params.id)

    if(!student){
        res.status(404)
        res.json({
            message: "Students Not Found!"
        })
    }

    res.status(200)
    res.json(student)


       

  }




const updateStudent = async (req, res) => {
  try {
    const { name, age, course } = req.body;

    // Validation
    if (!name || !age || !course) {
      return res.status(400).json({
        message: "Please fill all details",
      });
    }

    // Update Student
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { name, age, course }, // safe update
      { new: true } // return updated document
    );

    if (!updatedStudent) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    return res.status(200).json({
      message: "Student updated successfully",
      data: updatedStudent,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};


const removeStudent = async (req, res) => {

  await Student.findByIdAndDelete(req.params.id) 
  res.status(200)
  res.json({
    msg : "blog deleted",
    id : req.params.id
  })

 
}

const studentController = {getStudent, addStudent, getStudents, updateStudent, removeStudent};

export default studentController