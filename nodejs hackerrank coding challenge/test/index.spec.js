const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
const should = chai.should();
const BlueBird = require("bluebird");
const connectionManager = require("../connection");
const model = require("../models/cars");

chai.use(chaiHttp);

const setup = (...userObjects) => {
  return BlueBird.mapSeries(userObjects, (user) => {
    return chai
      .request(server)
      .post("/cars")
      .send(user)
      .then((response) => {
        return response.body;
      });
  });
};

const wait = (time) => new Promise((resolve) => setTimeout(resolve, time));

describe("Cars collection API Mongoose", () => {
  const car23ABX = {
    car_code: "BX1",
    company: "BMW",
    model: "X1",
    price: 200000,
    timestamp: 1591522701000,
  };

  const car23AAC = {
    car_code: "TI2",
    company: "Toyota",
    model: "Innova",
    price: 120000,
    timestamp: 1591572701000,
  };
  const cusotomer24XYZ = {
    car_code: "FE4",
    company: "Ford",
    model: "Endeavour",
    price: 140000,
    timestamp: 1591572701000,
  };
  let mongoose;

  before(async () => {
    mongoose = await connectionManager();
  });

  afterEach(async () => {
    await model.deleteMany();
  });

  after(async (done) => {
    mongoose.connection.close();
    delete require.cache[require.resolve("../bin/www")];
    done();
  });

  it("should add a new car", async () => {
    const response1 = await chai.request(server).post("/cars").send(car23ABX);
    response1.should.have.status(201);
    delete response1.body.id;
    response1.body.should.eql(car23ABX);
    const response2 = await chai.request(server).post("/cars").send(car23AAC);
    response2.should.have.status(201);
    delete response2.body.id;
    response2.body.should.eql(car23AAC);
  });

  it("should fetch all the cars", async () => {
    const results = await setup(car23AAC, car23ABX, cusotomer24XYZ);
    const response = await chai.request(server).get("/cars");
    response.should.have.status(200);
    response.body.should.eql(results);
  });

  it("should fetch a single car", async () => {
    const [car] = await setup(cusotomer24XYZ);
    const response = await chai.request(server).get(`/cars/${car.id}`);
    response.should.have.status(200);
    response.body.should.eql(car);
  });

  it("should get 404 if the car ID does not exists", async () => {
    const response = await chai.request(server).get(`/cars/32323`);
    response.should.have.status(404);
    response.text.should.eql("ID not found");
  });

  it("should get 405 for a delete request to /cars/:id", async () => {
    const [car] = await setup(car23AAC);
    const response = await chai.request(server).delete(`/cars/${car.id}`);
    response.should.have.status(405);
  });

  it("should get 405 for a put request to /cars/:id", async () => {
    const [car] = await setup(car23AAC);
    const response = await chai
      .request(server)
      .put(`/cars/${car.id}`)
      .send(car23ABX);
    response.should.have.status(405);
  });

  it("should get 405 for a patch request to /cars/:id", async () => {
    const [car] = await setup(car23AAC);
    const response = await chai
      .request(server)
      .patch(`/cars/${car.id}`)
      .send(car23ABX);
    response.should.have.status(405);
  });

});
