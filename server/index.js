"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const port = 8888;

express()
  .use(morgan("tiny"))
  .use(express.json())

  .use(express.static("public"))

  // this is our catch all endpoint.
  .get("/test", (req, res) => {
    res.status(200).json({ worked: true });
  })

  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(port, () => console.log(`Listening on port ${port}`));
