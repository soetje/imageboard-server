const express = require("express")
const { Router } = express
const User = require("../models").user
const bcrypt = require("bcrypt")
const router = new Router()

router.get("/", async (req, res) => { 
  try {
    const user = await User.findAll()
    res.json(user)
  } catch (error) {
    res.status(400).send({ message: "Error in getting users, sorry" })
  }
})

router.post("/", async (req, res, next) => {
  try {
    const { email, password, fullName } = req.body;
    if (!email || !password || !fullName) {
      res.status(400).send("missing parameters");
    } else {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const newUser = await User.create({
        email,
        password: hashedPassword,
        fullName,
      });
      res.json(newUser);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router
