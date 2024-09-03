import express from "express";
import{getProducts, createProduct, getProduct, deleteProduct,updateProduct} from "../controllers/products.js";


const router = express.Router();

//make route for product functions
router.get("/products", getProducts);
router.post("/product", createProduct);
router.get("/product/:id", getProduct);
router.delete('/product/:id', deleteProduct);
router.put('/product/:id', updateProduct);

export default router;