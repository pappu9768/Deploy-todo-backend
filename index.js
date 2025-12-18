import express from 'express'
import dotenv from 'dotenv'
import connectDB from './src/DB/connectDb.js';
import routes from './src/routes/user.routes.js';
dotenv.config();
import cors from 'cors'
import { userAuthorization } from './src/middlewares/userAuthorization.js';


const app = express();

// let isConnected = false
// async function connectDB(){
//     try {
//         const mongoUri = process.env.MONGO_URI
//         const con = await mongoose.connect(mongoUri)
//         isConnected = true
//         console.log(`Database Connected successfully ${con.connection.host}`)
//     } catch (error) {
//         console.log(error)
//     }
// }


app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173'
}))

// app.use((req,res,next) => {
//     if(!isConnected){
//         connectDB()
//     }
//     next();
// })
// routes 
app.use('/api/v1/auth', routes);

app.get("/", async (req, res) => {
    await connectDB();
    res.send("Backend running");
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

module.exports = app