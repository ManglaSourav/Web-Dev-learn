const express = require("express");
const router = express.Router();
const Property = require("../../models/Property");

// @route   GET /api/property
// @desc    return all saved property
// @access  Public
router.get("/", (req, res) => {
  Property.find({}, function(err, result) {
    res.send({ result });
  });
});

// @route   POST /api/property/create
// @desc    create a new property
// @access  Public
router.post("/create", (req, res) => {
  // console.log(req.body);
  const amenities = req.body.amenities;
  const newProperty = new Property({
    amenities: amenities.split(","),
    ...req.body
  });
  newProperty
    .save()
    .then(() => res.send(" Property Added Sucessfully"))
    .catch(err => res.json(err));
});

// @route   POST /api/property/edit/:id
// @desc    edit existing property
// @access  Public
router.post("/edit/:id", (req, res) => {
  Property.findOneAndUpdate({ _id: req.params.id }, req.body, function(
    err,
    doc
  ) {
    if (err) return res.send(500, { error: err });
    return res.send("Property is edited sucessfully");
  });
});

module.exports = router;
