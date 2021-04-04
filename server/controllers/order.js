import Inquiry from "../models/inquiry.js";
import Product from "../models/product.js";
import User from "../models/user.js";
import nodemailer from 'nodemailer';
import Company from "../models/company.js";
import Order from "../models/order.js";

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require('dotenv').config();

const EMAIL_ID = process.env.EMAIL_ID;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_ID,
        pass: EMAIL_PASSWORD
    }
});

export const addOrder = async (req, res) => {
    try {
        const data = await Order.create({ userid: req.userId, companyid: req.body.companyid, productid: req.body.productid, quantity: req.body.quantity, amount: req.body.amount, transport: req.body.transport, city: req.body.city, state: req.body.state, status: req.body.status });
        res.status(200).json(data);

    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}

export const getOrder = async (req, res) => {
    try {
        const userData = await User.findOne({ _id: req.userId });
        if (userData.isCompany) {
            const dummy = await Company.findOne({ userid: req.userId });
            const orderData = await Order.find({ companyid: dummy._id }).sort({ date: 1 });
            if (orderData == null)
                res.status(404).json({ message: 'no orders placed' });
            //console.log(orderData);
            var finalData = [];
            for (var i in orderData) {
                const productData = await Product.findById(orderData[i].productid);
                const companyData = await Company.findById(orderData[i].companyid);
                finalData.push({ orderData: orderData[i], productData: productData, companyData: companyData });
            }
            //console.log(finalData);
            res.status(200).json(finalData);
        }
        else {
            const orderData = await Order.find({ userid: req.userId }).sort({ date: 1 });
            if (orderData == null)
                res.status(404).json({ message: 'no orders placed' });
            //console.log(orderData);
            var finalData = [];
            for (var i in orderData) {
                const productData = await Product.findById(orderData[i].productid);
                const companyData = await Company.findById(orderData[i].companyid);
                finalData.push({ orderData: orderData[i], productData: productData, companyData: companyData });
            }
            //console.log(finalData);
            res.status(200).json(finalData);
        }
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
};

export const acceptOrder = async (req, res) => {
    try {
        const data = await Order.findByIdAndUpdate(req.params.id, { status: "InProcess" });
        const userData = await User.findOne({ _id: data.userid });
        const productData = await Product.findOne({ _id: data.productid });
        const companyData = await Company.findOne({ _id: data.companyid });
        var mailOptions = {
            from: EMAIL_ID,
            to: userData.email,
            subject: `Order --- '${data._id}' --- is accepted from ${companyData.name}`,
            text: `Product SKU No. : ${productData.sku} - ${productData.name} , Quantity : ${data.quantity} , Amount : ${data.amount}₹ is accepted , so currently order status is inprocess means product is now being manufactured`
        };
        res.status(200).json(data);
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}

export const dispatchOrder = async (req, res) => {
    try {
        const data = await Order.findOne({ _id: req.params.id });
        const userData = await User.findOne({ _id: data.userid });
        const productData = await Product.findOne({ _id: data.productid });
        const companyData = await Company.findOne({ _id: data.companyid });
        const updateddata = await Order.findByIdAndUpdate(req.params.id, { status: "Dispatched" });
        var mailOptions = {
            from: EMAIL_ID,
            to: userData.email,
            subject: `Order --- '${data._id}' --- is dispatched from ${companyData.name}`,
            text: `Product SKU No. : ${productData.sku} - ${productData.name} , Quantity : ${data.quantity} , Amount : ${data.amount}₹ , so currently order status is dispatched`
        };
        res.status(200).json(data);
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}

export const declineOrder = async (req, res) => {
    try {
        const data = await Order.findOne({ _id: req.params.id });
        const userData = await User.findOne({ _id: data.userid });
        const productData = await Product.findOne({ _id: data.productid });
        const companyData = await Company.findOne({ _id: data.companyid });
        const deleteData = await Order.deleteOne({ _id: req.params.id });
        var mailOptions = {
            from: EMAIL_ID,
            to: userData.email,
            subject: `Order --- '${data._id}' --- is declined from ${companyData.name}`,
            text: `Product SKU No. : ${productData.sku} - ${productData.name} , Quantity : ${data.quantity} , Amount : ${data.amount}₹ is declined, reason not specified by seller...`
        };
        res.status(200).json(data);
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}