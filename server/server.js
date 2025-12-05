import express from "express"


const app = express();
const PORT = process.env.PORT || 1234;

// Middleware to read JSON
app.use(express.json());
app.use(express.urlencoded())

// Routes
import studentRoutes from "./routes/studentRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import connectDb from "./config/dbConfig.js"
import errorHandler from "./middelware/errorHandler.js";


//DB connection

connectDb()

// Default route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome To Students API 1.0"
  });
});

app.listen(PORT, () => {
  console.log("SERVER IS RUNNING AT PORT:", PORT);
});

//for student fill data 
app.use("/api/students", studentRoutes);

//for auth 
app.use("/api/auth", authRoutes)

//for error handling
app.use(errorHandler)