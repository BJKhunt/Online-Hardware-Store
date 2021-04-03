import Company from "../models/company.js";
import User from "../models/user.js";

export const getCompany = async (req, res) => {

    try {
        const data = await Company.find({ userid: req.userId }).sort({ date: 1 });
        //console.log(data);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
};

export const getUnverifiedCompany = async (req, res) => {

    try {
        const data = await Company.find({ isVerified: false }).sort({ date: 1 });
        //console.log(data);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
};

export const getCompanyById = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await Company.findOne({ _id: id });
        //console.log(data);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
};

export const getAllCompany = async (req, res) => {

    try {
        const data = await Company.find().sort({ date: 1 });
        //console.log(data);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
};

export const deleteCompany = async (req, res) => {

    const { id } = req.params;
    try {
        var data = await Company.deleteOne({ _id: id });
        res.json({ message: "Trigger deleted successfully." });
    }
    catch (err) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}

export const createCompany = async (req, res) => {
    try {
        const data = await Company.create({ address: req.body.address, gst: req.body.gst, name: req.body.name, userid: req.userId, city: req.body.city, state: req.body.state, contact: req.body.contact, description: req.body.description });
        //console.log(data);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}
/*
export const updateProduct = async (req, res) => {
    try {
        const data = await Product.findByIdAndUpdate(req.body._id, { _id: req.body._id, catagory: req.body.catagory, name: req.body.name, sku: req.body.sku, finish: req.body.finish, userid: req.userId, price: req.body.price, size: req.body.size, url: req.body.url }, { new: true });
        //console.log(data);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}*/

export const verifyCompany = async (req, res) => {
    try {
        const data = await Company.findByIdAndUpdate(req.body._id, { isVerified: true }, { new: true });
        //console.log(data);
        const userData = await User.findOne({ _id: req.body.userid });
        const updatedData = await User.findByIdAndUpdate(req.body.userid, { isCompany: true });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}