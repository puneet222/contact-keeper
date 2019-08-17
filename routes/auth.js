const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");

const { check, validationResult } = require("express-validator");
const router = express.Router();

// @route       GET api/auth
// @desc        Authenticates users
// @access      Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.send(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// @route       POST api/auth
// @desc        Authenticates users
// @access      Private
router.post(
  "/",
  [
    check("email", "Email is not valid").isEmail(),
    check("password", "Password is required").exists()
  ],
  async (req, res) => {
    // const errors = validationResult(req);
    // if (errors) {
    //   res.status(400).json({ errors: errors.array() });
    // }
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        res.status(400).json({ msg: "Invalid User credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        res.status(400).json({ msg: "Invalid User credentials" });
      }
      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) {
            console.log("error in jwt sign");
            throw err;
          }
          console.log("token : ", token);
          res.status(200).json({ token });
        }
      );
    } catch (err) {
      console.log("in catch block");
      console.error(error.message);
      res.status(500).json({ msg: "Internal server error" });
    }
  }
);

module.exports = router;
