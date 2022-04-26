const express = require("express");
const User = require("../models/user.model");

const router = express.Router();
router.get('/all', async (req, res) => {
    try {
        const user = await User.find().lean().exec();
        return res.status(200).send(user)
    }
    catch(err){
        return res.status(400).send({message : "users not found"})
    }
})
module.exports = router;
