const express = require("express");
const router = express.Router();
const Car = require('../models/cars');

let nextCarId = 1;

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("<p>HTML Data</p>");
});

// POST request to create a new car
router.post("/cars", (req, res) => {
  const { car_code, company, model, price, timestamp } = req.body;
  const car = new Car({
    car_code,
    company,
    model,
    price,
    timestamp,
    id: nextCarId
  });
  nextCarId = nextCarId + 1;
  car.save((err, savedCar) => {
    if (err) {
      res.status(500).send("Error creating car");
    } else {
      res.status(201).json(savedCar);
    }
  });
});

// GET request to retrieve all cars
router.get("/cars", (req, res) => {
  Car.find({}, (err, cars) => {
    if (err) {
      res.status(500).send("Error retrieving cars");
    } else {
      res.status(200).json(cars);
    }
  });
});

// GET request to retrieve a specific car by ID
router.get("/cars/:id", (req, res) => {
  const id = parseInt(req.params.id);
  Car.findOne({ id: id }, (err, car) => {
    if (err) {
      res.status(500).send("error fetching cars");
    } else if (car) {
      res.status(200).json(car);
    } else {
      res.status(404).send("ID not found");
    }
  });
});

// DELETE request to delete a car (not allowed)
router.delete("/cars/:id", (req, res) => {
  res.status(405).send("Method Not Allowed");
});

// PUT request to update a car (not allowed)
router.put("/cars/:id", (req, res) => {
  res.status(405).send("Method Not Allowed");
});

// PATCH request to update a car (not allowed)
router.patch("/cars/:id", function (req, res) {
  return res.status(405).send("Request Not allowed");
});

module.exports = router;
