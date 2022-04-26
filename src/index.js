const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config()

const connect = require("./configs/db");
const userController = require("./controllers/user.controller");
const petController = require("./controllers/pet.controller");
const petCenterController = require("./controllers/petcenter.controller")
app.use(express.static('public'));
const { register, login } = require("./controllers/auth.controller");

app.post("/register", register);
app.post("/login", login);
app.use("/pet",petController);
app.use("/petcenter",petCenterController);
app.use("/user", userController);

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
    try {
        await connect();
        console.log("Listening on port 8080");
    } catch (error) {
        console.log('error:', error)
    }
})
