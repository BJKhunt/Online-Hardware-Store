import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";
import Company from "../models/company.js";

const secret = 'test';

export const signin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

    if (oldUser.isCompany) {
      const companyData = await Company.findOne({ userid: oldUser._id });
      res.status(200).json({ result: { _id: oldUser._id, isCompany: oldUser.isCompany, email: oldUser.email, password: oldUser.password, name: oldUser.name, date: oldUser.date, c_id: companyData._id, cisVerified: companyData.isVerified, caddress: companyData.address, cgst: companyData.gst, cname: companyData.name, ccity: companyData.city, cstate: companyData.state, ccontact: companyData.contact, cdescription: companyData.description, cdate: companyData.date }, token });
    }
    else {
      res.status(200).json({ result: oldUser, token });
    }
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) return res.status(400).json({ message: "User already exists" });

    if (password != confirmPassword) return res.status(400).json({ message: "Incorrect Password" });

    const repassword = password;

    const hashedPassword = await bcrypt.hash(password, 12);

    const isPasswordCorrect = await bcrypt.compare(repassword, hashedPassword);

    const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: "1h" });

    res.status(201).json({ result, token });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};