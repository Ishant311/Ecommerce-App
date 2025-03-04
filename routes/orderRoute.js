import express from "express"
import { updateStatusController } from "../controllers/orderController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";


const route = express.Router();

route.put("/update-status",requireSignIn,isAdmin,updateStatusController);
export default route;