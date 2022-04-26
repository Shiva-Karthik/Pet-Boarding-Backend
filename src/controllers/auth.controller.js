require("dotenv").config();
const userSchema = require("../models/user.model");
const jwt = require("jsonwebtoken");

const newToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET_KEY);
};

const register = async (req, res) => {
  try {
    let user = await userSchema
      .findOne({ username: req.body.username })
      .lean()
      .exec();

    if (user) return res.status(400).send({ message: "Existing User" });

    user = await userSchema.create(req.body);

    const token = newToken(user);

    res.send({ user, token });
  } catch (error) {
    res.send(error.message);
  }
};

const login = async (req, res) => {
  try {
    const user = await userSchema.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).send({ message: "Incorrect Username or Password" });
    }

    const match = user.checkPassword(req.body.password);
    if (!match) {
      return res.status(404).send({ message: "Incorrect Username or Password" });
    }    
    const token = newToken(user);

    res.send({ user, token });
 
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = { register, login, newToken };
// Try `npm i --save-dev @types/jsonwebtoken` if it exists or add a new declaration
// (.d.ts) file containing `declare module 'jsonwebtoken';`
