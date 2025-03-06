import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs"
import categoryModel from "../models/categoryModel.js"
import dotenv from"dotenv"
import Razorpay from "razorpay"
import orderModel from "../models/orderModel.js";
import crypto from "crypto";


dotenv.config();

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
});



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
        const deleteProduct = await productModel.findByIdAndDelete(req.params.id);
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
            message:"product updated successfully",
            products
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"error in updating product"
        })        
    }
}

export const productFilterController = async(req,res)=>{
    try {
        const {checked,radio} = req.body;
        let args = {};
        if(checked.length>0) args.category = checked;
        if(radio.length>0) {
            console.log(radio[0],radio[1]);
            args.price = {$gte:radio[0] , $lte:radio[1]}
        }
        const products = await productModel.find(args);
        // console.log(products);
        res.status(200).send({
            success:true,
            products 
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"error in filtering product"
        })   
    }
}

export const productListController = async (req,res)=>{
    try {
        const perPage = 6;
        const page = req.params.page?req.params.page:1;
        const products = await productModel.find({}).select("-photo").limit(perPage*page).sort({createdAt:-1});

        res.status(200).send({
            success:true,
            products
        })
        
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"error in listing product"
        })   
    }
}

export const totalProductController = async(req,res)=>{
    try {
        const total = await productModel.find({});
        const totalLength = total.length;
        res.status(200).send({
            success:true,
            totalLength
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"error in getting product"
        })
    }
}
export const searchProductController = async(req,res)=>{
    try {
        const {keyword} = req.params;

        //1 way
        // const product = await productModel.find({
        //     $or:[
        //         {name:{$regex :keyword,$options:"i"}},
        //         {description:{$regex :keyword,$options:"i"}},
        //     ]
        // })

        //2 way
        const product = await productModel.find({
            $text: { $search: keyword }
        }).select("-photo").sort({ score: { $meta: "textScore" } });
        res.status(200).send({
            success:true,
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"error in searching product"
        })
    }
}

export const similarProductsController = async(req,res)=>{
    try {
        const {pid,cid} = req.params;
        const product = await productModel.find({
            category:cid,
            _id:{$ne:pid}
        }).select("-photo").limit(3).populate("category");
        res.status(200).send({
            success:true,
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"error in similar product"
        })
    }
}

export const categoryProductController = async(req,res)=>{
    try {
        const category = await categoryModel.findOne({slug:req.params.slug});
        const product = await productModel.find({
            category:category._id
        }).select("-photo").populate("category");
        res.status(200).send({
            success:true,
            product,
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"error in similar product"
        })
    }
}
export const checkout = async(req,res)=>{
    try{

        const {cart,total} = req.body;
        const options = {
            amount:Number(total * 100),
            currency:"INR",
        }
        const order = await instance.orders.create(options);
    
        res.status(200).json({
            success:true,
            order
        })
    }catch(error){
        console.log(error)
    }
}
export const paymentVerification = async(req,res)=>{
    try {
        
        const {razorpay_signature,razorpay_payment_id,razorpay_order_id,cart,total} = req.body;
        let ids = [];
        for(let i = 0;i<cart.length;i++){
            ids.push(cart[i]._id);
        }
        console.log(ids);
        const generated_signature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex");
        
        if(generated_signature === razorpay_signature){
            try {
                const order = await orderModel.create({
                    products:ids,
                    payment:total,
                    buyer:req.user._id,
                })
                res.status(200).json({success:true,order});
            } catch (error) {
                res.status(500).send(
                    {
                        success:false,
                        message:"error in adding products",
                        error
                    })
            }
        }
        else{
            res.status(404).json({success:true});
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"error in payment"
        })
    }

}
export const getOrderController = async(req,res)=>{
    try {
        const order = await orderModel.find({buyer:req.user._id});
        res.status(200).send({
            success:true,
            message:"orders fetched successfully",
            order
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"error in fetching order"
        })
    }
}

export const getProductsOnlyController = async(req,res)=>{
    try {
        const {products} = req.body;
        const productDetails = await productModel.find({_id:{$in:products}}).select("-photo");
        res.status(200).send({
            success:true,
            productDetails
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"error in fetching order"
        })
    }
}

export const getOrderControllerByUser = async(req,res)=>{
    try {
        const order = await orderModel.find({buyer:req.params.id}).populate({
            path:"buyer",
            select:"-password -answer -role"
        }).populate({
            path:"products",
            select:"-photo"
        });
        res.status(200).send({
            success:true,
            message:"orders fetched successfully",
            order
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"error in fetching order"
        })
    }
}