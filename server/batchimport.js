const indoor = require("./data/indoor.json");
const outdoor = require("./data/outdoor.json");

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const batchimport = async () => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("Fields");
  try {
    await client.connect();
    await db.collection("outdoor").insertMany(outdoor);
    // await db.collection("indoor").insertMany(indoor);
    await client.close();
  } catch (err) {
    console.log(err);
  }
};

batchimport();
