import {v4 as uuid} from "uuid";


//define array to store data
let products =[];


//function to get all data from products array
export const getProducts = (req, res)=>{
    res.send(products)
};

//function to store new element in product array
export const createProduct = (req, res) =>{
    try {
        const product = req.body;
        products.push({...product, id:uuid()});
        res.send("Product Added Successfully")
    } catch (error) {
        res.send("An error occurred while creating the product.");
    }

}

//function to get one data from products array using by id
export const getProduct = (req, res)=>{
    try {
        const singleProduct = products.filter((product) =>product.id === req.params.id);
        res.send(singleProduct);
    } catch (error) {
        res.send("An error occurred while getting the product.");
    }
}

//function to delete element from data using by id product
export const deleteProduct = (req, res) => {
    try {
        const productIndex = products.findIndex((product) => product.id === req.params.id);
        if (productIndex !== -1) {
            products.splice(productIndex, 1);
            res.send("Product deleted Successfully");
        } else {
            res.status(404).send("Product not found");
        }
    } catch (error) {
        res.send("An error occurred while deleting the product.");
    }
};

//function to update data information for element in array using by id product
export const updateProduct = (req, res )=>{
    try {
        const product = products.find((product) =>product.id === req.params.id);        
        product.productName = req.body.productName;
        product.price = req.body.price;
        res.send("Product update Successfully");
    } catch (error) {
        res.send("An error occurred while updating the product.");
    }

};