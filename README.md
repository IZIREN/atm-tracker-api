# ATM Tracker API

This is a simple RESTful web api backend to represent ATM transaction details.
This data contained in the repo does not represent any real data, but is representative
of actual data that may exist.  The data is for testing purposes only.

This backend api is intented to be used with the front-end client code I'm developing at
the 'atm-cash-tracker' repo.  This repo is leveraging AngularJS to implement the client
side MV* framework.

This entire project started as a practical exercise to implement much of what I was
learning as I journeyed down the path of understanding the MEAN stack.  I am a big fan
of an iterative approach to development, so much of what is contained here is not
intented to be the final version.  Although on the surface this project may seem trivial,
another objective of this project is to focus on sound programming/development practices.

### Defined APIs

- GET    http://localhost:8080/

- GET    http://localhost:8080/api/atm
- POST   http://localhost:8080/api/atm

- GET    http://localhost:8080/api/atm/:atm_id
- PUT    http://localhost:8080/api/atm/:atm_id
- DELETE http://localhost:8080/api/atm/:atm_id

- GET    http://localhost:8080/api/atm/:atm_id/purchases
- POST   http://localhost:8080/api/atm/:atm_id/purchases

- GET    http://localhost:8080/api/atm/:atm_id/purchases/:purchaseId
- DELETE http://localhost:8080/api/atm/:atm_id/purchases/:purchaseId

## Install
####[Node.js](http://www.nodejs.org) is required to run this project.

- To install the required depdencencies, run:
```
$ npm install
```
- To start the server, run:
```
$ node server.js
```
- or, alternatively, you can run the server utilizing the 'start' script:
```
$ npm start
```

## Tests

To run the unit tests, mocha needs to be installed globally. You can install mocha by running:
```
$ npm install -g mocha
````

To run the test suite, run:
```
$ npm test
```
