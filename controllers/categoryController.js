import slugify from "slugify"
import categoryModel from "../models/categoryModel.js"

export const createCategoryController = async (req,res)=>{
    try {
        const {name} = req.body;
        if(!name)  return res.status(404).send({message:'Name is required'});

        const categoryExists = await categoryModel.findOne({name});
        if(categoryExists){
            return res.status(200).send({
                success:true,
                message:"Category already exists"
            })
        }
        const category = await categoryModel.create({name,slug : slugify(name)})
        res.status(201).send({
            success:true,
            message:"new Category Created",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error in Category"
        })
    }
}
export const updateCategoryController = async (req,res)=>{    
    try{
        const {name} = req.body;
        const {id} = req.params;
        if(!name){
            return res.status(401).send({
                message:"Enter Name Please!!"
            })
        }
        const category = await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true});
        res.status(200).send({
            success: true,
            message: "Category Updated Successfully",
            category
        });
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Internal server error!!",
            error
        })
    }
}

export const categoryController = async (req,res)=>{
    try {
        const category = await categoryModel.find({});
        return res.status(200).send({
            success:true,
            message:"All Categories List",
            category,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"error in db",
            error
        })
    }
}

export const singleCategoryController = async (req,res)=>{
    try {
        const {slug} = req.params
        const category = await categoryModel.findOne({slug});
        if(!category){
            return res.status(404).send({
                success:false,
                message:"No Category like This",
            })
        }
        return res.status(200).send({
            success:true,
            message:"Category is found",
            category
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send(
            {
                success:false,
                message:"error in db",
                error
            }
        )
    }
}

export const deleteCategoryController = async(req,res)=>{
    try {
        const {id} = req.params;
        const deleteCategory = await categoryModel.findByIdAndDelete(id);
        return res.status(203).send({
            success:true,
            message:"Deleted successfully"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send(
            {
                success:false,
                message:"error in db",
                error
            }
        )
    }
}