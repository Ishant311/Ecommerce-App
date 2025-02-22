import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs"

// name:{
//         type:String,
//         required:true
//     },
//     slug:{
//         type:String,required:true,
//         lowercase:true
//     },
//     description:{
//         type:String,
//         required:true
//     },
//     price:{
//         type:String,
//         required:true
//     },
//     category:{
//         type:mongoose.ObjectId,
//         ref:"Category",
//         required:true
//     },
//     quantity:{
//         type:Number,
//         required:true
//     },
//     photo:{
//         data:Buffer,
//         contentType:String,
//     },
//     shipping:{
//         type:Boolean,
//     }
export const createProductController = async (req,res)=>{
    try {
        const {name,description,price,category,quantity,shipping} = req.fields;

        const {photo} = req.files;
        switch (true) {
            case !name:
                return res.send({message:"Name is required"})
            case !description:
                return res.send({message:"Description is required"})
            case !price:
                return res.send({message:"Price is required"})
            case !category:
                return res.send({message:"Category is required"})
            case !quantity:
                return res.send({message:"Quantity is required"})
            case !photo && photo.size > 1000000:
                return res.send({message:"Photo is required and must be within 1mb"})
            default:
                break;
        }
        const products = new productModel({...req.fields, slug:slugify(name)})
        if(photo){ 
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        return res.status(201).send({
            success:true,
            message:"product created successfully",
            products
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"error in creating product"
        })        
    }    
}

export const getProductController = async (req,res)=>{
    try {
        const product = await productModel.find({}).populate('category').select("-photo").limit(12).sort({createdAt:-1})
        res.status(200).send({
            success:true,
            message:"all the fetching done",
            product
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"error in server",
            error
        })
    }
}

export const getDesiredProductController = async(req,res)=>{
    try {
        const {slug} = req.params;
        const product = await productModel.findOne({slug}).populate('category').select("-photo");
        return res.status(200).send({
            success:true,
            message:"found the product in 0.23s",
            product
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"error in server",
            error
        })
    }
}

export const productPhotoController = async(req,res)=>{
    try {
        const product = await productModel.findById(req.params.pid).select("photo");
        if(product.photo.data){
            res.set('Content-type',product.photo.contentType);
            return res.status(200).send(product.photo.data); 
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in server",
            error
        })
    }
}

export const deleteProductController = async(req,res)=>{
    try {
        const deleteProduct = await productModel.findById(req.params.id);
        res.status(200).send({
            success:true,
            message:"deleted successfully",
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"error in server",
            error
        })
    }
}

export const updateProductController = async(req,res)=>{
    try {
        const {name,description,price,category,quantity,shipping} = req.fields;
        const {photo} = req.files;
        switch (true) {
            case !name:
                return res.send({message:"Name is required"})
            case !description:
                return res.send({message:"Description is required"})
            case !price:
                return res.send({message:"Price is required"})
            case !category:
                return res.send({message:"Category is required"})
            case !quantity:
                return res.send({message:"Quantity is required"})
            case !photo && photo.size > 1000000:
                return res.send({message:"Photo is required and must be within 1mb"})
            default:
                break;
        }
        const products = await productModel.findById(req.params.id)
        products.name = name;
        products.description = description;
        products.slug = slugify(name);
        products.price = price;
        products.category = category;
        products.quantity = quantity;
        if(photo){ 
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        return res.status(201).send({
            success:true,
            message:"product created successfully",
            products
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"error in creating product"
        })        
    }
}