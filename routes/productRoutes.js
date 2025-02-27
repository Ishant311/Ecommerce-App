import express from "express"
import {requireSignIn , isAdmin} from "../middlewares/authMiddleware.js"
import { createProductController,getProductController,getDesiredProductController,productPhotoController,deleteProductController,updateProductController,productFilterController, productListController, totalProductController, searchProductController, similarProductsController, categoryProductController, checkout, paymentVerification, getOrderController, getProductsOnlyController } from "../controllers/productController.js";
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

router.post('/get-product',getProductsOnlyController)

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

router.post('/product-filters',productFilterController)

router.get('/product-list/:page',productListController)

router.get('/total-product',totalProductController)

router.get('/search-product/:keyword',searchProductController)

router.get('/similar-product/:pid/:cid',similarProductsController)

router.get('/category-product/:slug',categoryProductController)

router.post('/checkout',checkout)

router.post('/paymentverification',requireSignIn,paymentVerification)

router.get("/get-order",requireSignIn,getOrderController);






export default router;