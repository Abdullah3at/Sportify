"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const port = 8888;
const {
  getOutdoor,
  getIndoor,
  getIndoorById,
  getOutdoorById,
  addReservation,
  addUser,
  getReservation,
  deleteReservation,
} = require("./handlers");

express()
  .use(morgan("tiny"))
  .use(express.json())

  .use(express.static("public"))

  // this is our catch all endpoint.
  .get("/test", (req, res) => {
    res.status(200).json({ worked: true });
  })

  .get("/outdoor", getOutdoor)
  .get("/indoor", getIndoor)
  .get("/indoor/:_id", getIndoorById)
  .get("/outdoor/:_id", getOutdoorById)
  .get("/reservation/:email", getReservation)

  .post("/add-user/:userId", addUser)
  .post("/add-reservation", addReservation)

  .patch("/delete-reservation/:_id", deleteReservation)

  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(port, () => console.log(`Listening on port ${port}`));
