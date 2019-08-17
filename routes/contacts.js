const express = require("express");
const { check, validationResult } = require("express-validator");

const User = require("../models/Users");
const Contact = require("../models/Contact");
const auth = require("../middleware/auth");

const router = express.Router();

// @route       POST api/contacts
// @desc        Create Contact
// @access      Private
router.post(
  "/",
  [
    auth,
    [
      check("name")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // if (errors) {
    //   res.status(400).json({ errors: errors.array() });
    // }

    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id
      });

      let contact = await newContact.save();
      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  }
);

// @route       GET api/contacts
// @desc        Read Contact
// @access      Private
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

// @route       PUT api/contacts/:id
// @desc        Update Contact
// @access      Private
router.put("/:id", auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  const updatedContact = {};
  if (name) updatedContact.name = name;
  if (email) updatedContact.email = email;
  if (phone) updatedContact.phone = phone;
  if (type) updatedContact.type = type;

  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(400).json({ msg: "Contact not found" });
    }
    if (contact.user.toString() !== req.user.id) {
      res.status(400).json({ msg: "Not Authorized" });
    }
    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: updatedContact },
      {
        new: true
      }
    );
    res.json({ contact });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

// @route       DELETE api/contacts/:id
// @desc        Delete Contact
// @access      Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(400).json({ msg: "Contact not found" });
    }
    if (contact.user.toString() !== req.user.id) {
      res.status(400).json({ msg: "Not Authorized" });
    }
    await Contact.findByIdAndRemove(req.params.id);
    res.json({ msg: "Successfully deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

module.exports = router;
