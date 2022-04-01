const router = require("express").Router();
const ContactUser = require("../models/ContactUser");
const Messages = require("../models/Messages");
// const accountSid = require("../config/keys").accountSid;
// const authToken = require("../config/keys").authToken;
// const client = require("twilio")(accountSid, authToken);
const accountSid = "AC40e5971718f6b70ace9ebd11e2573a99";
const authToken = "d4045c6ff2dbaba607281d497ee49a7d";
const client = require("twilio")(accountSid, authToken);

//@route GET /allContacts
//@desc Display all contacts
//@access Public
router.get("/api/allContacts", (req, res) => {
  ContactUser.find()
    .then(users => res.json(users))
    .catch(err => res.send({ message: "Error occured or no user found!" }));
});

//@route POST /api/add
//@desc Add new contact
//@access public
router.post("/api/add", (req, res) => {
  const new_contact = new ContactUser({
    name: req.body.name,
    mobileNumber: req.body.mobileNumber
  })
    .save()
    .then(() => res.json({ message: "Contact is saved" }))
    .catch(() => {
      res.json({
        message: "not able to save contact"
      });
    });
});

//@route GET /api/sendOTP
//@desc send OTP using API
//@access public
router.post("/api/sendOTP", (req, res) => {
  const new_message = {
    name: req.body.name,
    mobileNumber: `+91${req.body.mobileNumber}`,
    message_data: req.body.msg
  };

  //store that new_msg in db
  new Messages(new_message).save().then(() => {
    console.log("data is saved in mongodb");
  });
  client.messages
    .create({
      body: new_message.message_data,
      from: "+16175002589",
      to: `${new_message.mobileNumber}`
    })
    .then(message => console.log(message))
    .catch(err => console.log(err, "error in sending msg"));
});

// @route   GET /api/getMessages
// @desc    Get All Sent Messages
// @access  Public
router.get("/api/getMessages", (req, res) => {
  Messages.find().then(data => res.json(data));
});
module.exports = router;
