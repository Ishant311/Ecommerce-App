import express from "express"
import {registerController,loginController,testController,forgotPassword, updateProfileController} from "../controllers/authController.js"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post('/register',registerController);

router.post('/login',loginController);

router.get("/test",requireSignIn, isAdmin ,testController);

router.patch("/forgot-password",forgotPassword);


router.get("/user-auth",requireSignIn,(req,res)=>{
    res.status(200).send({ok:true});
})

router.get("/admin-auth",requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true});
})

router.put("/profile",requireSignIn,updateProfileController);

export default router;