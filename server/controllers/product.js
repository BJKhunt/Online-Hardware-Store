import Product from "../models/product.js";

export const getProduct = async (req, res) => {

    try {
        const data = await Product.find({ userid: req.userId }).sort({ date: 1 });
        //console.log(data);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
};

export const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await Product.findOne({ _id: id });
        //console.log(data);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
};

export const getAllProduct = async (req, res) => {

    try {
        const data = await Product.find().sort({ date: 1 });
        //console.log(data);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
};

export const deleteProduct = async (req, res) => {

    const { id } = req.params;
    try {
        var data = await Product.deleteOne({ _id: id });
        res.json({ message: "Trigger deleted successfully." });
    }
    catch (err) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}

export const createProduct = async (req, res) => {
    try {
        const data = await Product.create({ catagory: req.body.catagory, name: req.body.name, sku: req.body.sku, finish: req.body.finish, userid: req.userId, price: req.body.price, size: req.body.size, url: req.body.url, companyid: req.body.companyid });
        //console.log(data);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}

export const updateProduct = async (req, res) => {
    try {
        const data = await Product.findByIdAndUpdate(req.body._id, { _id: req.body._id, catagory: req.body.catagory, name: req.body.name, sku: req.body.sku, finish: req.body.finish, userid: req.userId, price: req.body.price, size: req.body.size, url: req.body.url, companyid: req.body.companyid }, { new: true });
        //console.log(data);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}