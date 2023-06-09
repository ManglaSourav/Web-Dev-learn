# Cars Collection API

## Data:

Example of a car data JSON object:

```
{
    "car_code": "FE4",
    "company": "Ford",
    "model": "Endeavour",
    "price": 140000,
    "timestamp": 1591572701000
}
```

## Project Specifications

You are provided with the implementation of the Car model. The REST service must expose the `/cars` endpoint, which allows for managing the collection of car records in the following way:

**POST** request to `/cars`:

- creates a new car
- expects a JSON car object without an id property as a body payload. You can assume that the given object is always valid.
- adds the given car object to the collection of cars and assigns a unique integer id to it. The first created car must have id 1, the second one 2, and so on.
- the response code is 201, and the response body is the created car object

**GET** request to `/cars`:

- returns a collection of all cars
- the response code is 200, and the response body is an array of all car objects ordered by their ids in increasing order

**GET** request to `/cars/<id>`:

- returns a car with the given id
- if the matching car exists, the response code is 200 and the response body is the matching car object
- if there is no car with the given id in the collection, the response code is 404 with the body having the text `ID not found`

**DELETE**, **PUT**, **PATCH** request to `/cars/<id>`:

- the response code is 405 because the API does not allow deleting or modifying cars for any id value

## Environment

- Node Version: 14(LTS)
- Default Port: 8000

**Read Only Files**

- `test/*`

**Commands**

- run:

```bash
npm start
```

- install:

```bash
npm install
```

- test:

```bash
npm test
```
