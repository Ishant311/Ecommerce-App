import express from "express"
import morgan from "morgan"
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js"
import categoryRoute from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import cors from "cors"


// configure env
dotenv.config();

//database config
connectDB();


const app = express();
const PORT = process.env.PORT || 8080;

//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());


//routes
app.use("/api/v1/auth",authRoute)
app.use("/api/v1/category",categoryRoute)
app.use("/api/v1/product",productRoutes)

//rest api
app.get("/",(req,res)=>{
    // console.log(req);
    res.send("<h1> Hello world </h1>")
})

app.listen(PORT,()=>{
    console.log(`Server Running on ${PORT}`)
})