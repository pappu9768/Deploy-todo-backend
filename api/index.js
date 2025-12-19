import express from 'express'
import dotenv from 'dotenv'
import connectDB from '../src/DB/connectDb.js';
import routes from '../src/routes/user.routes.js';
dotenv.config();
import cors from 'cors'
import { userAuthorization } from '../src/middlewares/userAuthorization.js';


const app = express();




//-------------------------------middleware--------------------------------

app.use(express.json());
app.use(cors({
  origin: '*'
}))

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("DB connection failed:", error);
    res.status(500).json({ message: "Database connection failed" });
  }
});


//-----------------------------------------------routes-----------------------------------------
app.use('/api/v1/auth', routes);
app.get("/check", (req, res) => {
  res.send("Backend running 🚀");
});


app.get('/api/loggedIn', userAuthorization, (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user


    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "error found while fetching logged in ",
      error
    })
  }
})

// const port = process.env.PORT
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
//     connectDB();
// })

export default app;