import Contact from "../models/contact.js";

export const addContact = async (req, res) => {
    try {
        const data = await Contact.create({ subject: req.body.subject, message: req.body.message, name: req.body.name, email: req.body.email, userid: req.userId });
        //console.log(data);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}