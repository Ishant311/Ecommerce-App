import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req,res)=>{
    try {
        const {name,email,password,phone,address,answer} = req.body;
        if(!name) return res.send({message: "Name is required"});
        if(!email) return res.send({message: "Email is required"});
        if(!password) return res.send({message: "Password is required"});
        if(!phone) return res.send({message: "Phone is required"});
        if(!address) return res.send({message: "Address is required"});
        if(!answer) return res.send({message:"Answer is required"});

        //existing user
        const userExists = await userModel.findOne({email});
        if(userExists){
            return res.status(200).send({
                success:false,
                message: "Already registered please login"
            });
        }
        const hashedPassword = await hashPassword(password);
        const hashedAnswer = await hashPassword(answer);
        const user = await userModel.create({name,password:hashedPassword,email,phone,address,answer:hashedAnswer});
        res.status(201).send({
            success:true,
            message:'User Register Successfully',
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in registeration",
            error
        })
    }
}
export const loginController = async (req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:"Invalid email or password"
            })
        }
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Email doesn't exist"
            })
        }
        const match = await comparePassword(password,user.password);
        if(!match){
            return res.status(404).send({
                success:false,
                message:"Invalid Password"
            })
        }

        const token = JWT.sign({
            _id:user._id
        },process.env.JWT_SECRET,{expiresIn:"7d"});
        res.status(200).send({
            success:true,
            message:"Logged in successfully",
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role:user.role
            },
            token:token,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in login',
            error
        })
    }
}

export const testController = (req,res)=>{
    const token = req.headers.authorization;
    res.send({
        status:true,
        message:"Logged in",
    })
}

export const forgotPassword = async (req,res)=>{
    try {
        const {email,answer,newPassword} = req.body;
        if(!email || !answer || !newPassword){
            return res.status(404).send({
                success:false,
                message:"all fields are required of the question"
            })
        }
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(400).send({
                success:false,
                message:"Wrong email"
            })
        }
        const match = await comparePassword(answer,user.answer);
        if(!match){
            return res.send({
                success:false,
                message:"Bhag jaa",
            })
        }
        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id,{
            password:hashed
        })
        res.status(200).send({
            success:true,
            message:"Password changed successfully",
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"Server is not well",
            error
        })
    }
}

