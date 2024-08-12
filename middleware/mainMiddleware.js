const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

//  middleware
const middleware = [
  morgan("dev"),
  express.urlencoded({ extended: true }),
  express.json(),
  cors(),
];

module.exports = (app) => {
  app.use(middleware);
};
