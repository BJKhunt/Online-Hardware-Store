import Inquiry from "../models/inquiry.js";
import Product from "../models/product.js";
import User from "../models/user.js";
import nodemailer from 'nodemailer';

const EMAIL_ID = process.env.EMAIL_ID;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'spinzastore@gmail.com',
        pass: 'emailpassword'
    }
});

export const addInquiry = async (req, res) => {
    try {
        const data = await Inquiry.create({ subject: req.body.subject, message: req.body.message, productid: req.body.productid, from: req.body.from, to: req.body.to });
        //console.log(data.productid);
        const productData = await Product.findOne({ _id: data.productid });
        //console.log(productData);
        var mailOptions = {
            from: EMAIL_ID,
            to: data.to,
            subject: `Inquiry --- '${data.subject}' --- from Spinza-Store`,
            text: `Product SKU No. : ${productData.sku} - ${productData.name} comes from ${data.from} & Message is ${data.message}`
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.status(200).json(data);
            } else {
                console.log('Email sent: ' + info.response);
                res.status(500).send({ message: error.message || "Error Occured" });
            }
        });

    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}

export const getInquiry = async (req, res) => {
    try {
        const userData = await User.findOne({ _id: req.userId });
        const fromInquiry = await Inquiry.find({ from: userData.email }).sort({ date: 1 });
        const toInquiry = await Inquiry.find({ to: userData.email }).sort({ date: 1 });
        //console.log(data);
        var finalData = [];
        for (var i in fromInquiry) {
            finalData.push(fromInquiry[i]);
        }
        for (var i in toInquiry) {
            finalData.push(toInquiry[i]);
        }
        function compare(a, b) {
            if (a.date < b.date) {
                return 1;
            }
            if (a.date > b.date) {
                return -1;
            }
            return 0;
        }
        finalData.sort(compare);
        //console.log(finalData);
        var imeanfinal = [];
        for (var i in finalData) {
            var dummy = await Product.findOne({ _id: finalData[i].productid });
            imeanfinal.push({ inquiryData: finalData[i], productData: dummy });
        }
        res.status(200).json(imeanfinal);
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
};