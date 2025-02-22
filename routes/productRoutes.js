import express from "express"
import {requireSignIn , isAdmin} from "../middlewares/authMiddleware.js"
import { createProductController,getProductController,getDesiredProductController,productPhotoController,deleteProductController,updateProductController } from "../controllers/productController.js";
import formidable from "express-formidable"

const router = express.Router();

//routes
router.post('/create-product',
    requireSignIn,
    isAdmin,
    formidable(),
    createProductController);

router.get('/get-product',getProductController);

router.get('/get-product/:slug',getDesiredProductController);

router.get('/product-photo/:pid',productPhotoController);

router.delete('/delete-product/:id',
    requireSignIn,
    isAdmin,
    deleteProductController);

router.put('/update-product/:id',
    requireSignIn,
    isAdmin,
    formidable(),
    updateProductController);

export default router;