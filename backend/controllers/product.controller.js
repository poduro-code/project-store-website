import mongoose from "mongoose";
import Product from "../models/product.model.js";


export const getProducts =  async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({success: true, products});
    }    catch (error) {
        console.error("Error in fetching products", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}
export const createProduct = async (req, res) => {
    const products = req.body;

    if (!products.name || !products.price || !products.description || !products.image || !products.brand || !products.category || !products.countInStock || !products.rating || !products.numReviews) {
        return res.status(400).json({ success:false, message: "Please fill all the fields" });
    }

    const newProduct = new Product(products);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, message: "Product created successfully", data: newProduct });
    } catch (error) {
        console.error("Error in create product", error.message);
        res.status(500).json({ success: false, message: "Error in creating product" });
    }
}
export const updatedProduct = async (req, res) => {
    const { id } = req.params;

    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid product ID" });
    }

    try {
      const updatedProduct =  await Product.findByIdAndUpdate(id, product, { new: true });
      res.status(200).json({ success: true, message: "Product updated successfully", data: updatedProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error in updating product" });
    }
}
export const deleteProduct = async (req, res) => {
    const { id } = req.params; 

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid product ID" });
    }

    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error in delete product", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

