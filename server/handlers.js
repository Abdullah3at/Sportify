const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const { v4: uuidv4 } = require("uuid");

const getOutdoor = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("Fields");
  try {
    await client.connect();
    let fields;
    fields = await db.collection("outdoor").find().toArray();
    if (!fields) {
      res.status(200).json("no fields");
    }
    res.status(200).json(fields);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  client.close();
};

const getIndoor = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("Fields");
  try {
    await client.connect();
    let fields;
    fields = await db.collection("indoor").find().toArray();
    if (!fields) {
      res.status(200).json("no fileds");
    }
    res.status(200).json(fields);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  client.close();
};

const getOutdoorById = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("Fields");
  const _id = Number(req.params._id);
  try {
    await client.connect();
    const field = await db.collection("outdoor").findOne({ _id: _id });
    if (!field) {
      res.status(200).json("no fileds");
    }
    res.status(200).json(field);
    client.close();
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const getIndoorById = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("Fields");
  const _id = Number(req.params._id);
  try {
    await client.connect();
    const field = await db.collection("indoor").findOne({ _id: _id });
    if (!field) {
      res.status(200).json("no fileds");
    }
    res.status(200).json(field);
    client.close();
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const addReservation = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("Fields");
  const db2 = client.db("Reservation");
  const _id = 1000;
  const fieldType = "indoor";

  try {
    await client.connect();

    let collection;
    if (fieldType === "indoor") {
      collection = "indoor";
    } else if (fieldType === "outdoor") {
      collection = "outdoor";
    } else {
      res.status(400).json("Invalid field type");
      return;
    }

    const fieldFound = await db.collection(collection).findOne({ _id: _id });
    // console.log("field", fieldFound.schedule[req.body.date]);
    // console.log("date", req.body.date);
    if (!fieldFound) {
      return res
        .status(400)
        .json({ data: req.body, message: "This field is not found." });
    }

    // console.log(fieldFound.schedule[req.body.date]);
    const dayFound = req.body.day;
    console.log("day", dayFound);
    if (!dayFound) {
      return res
        .status(400)
        .json({ data: req.body, message: " This day is not found." });
    }

    const timeFound = req.body.time;
    console.log("time", timeFound);
    if (!timeFound) {
      return res
        .status(400)
        .json({ data: req.body, message: " This time is not found." });
    }
    const key = `schedule.${dayFound}.startTime`;
    const key2 = `schedule.${dayFound}.$.isAvailable`;
    const query = { _id: Number(req.body.id), [key]: timeFound };
    console.log("id", req.body.id);
    const setUpdate = {
      $set: { [key2]: false },
    };

    console.log(setUpdate);

    const update = await db.collection(collection).updateOne(query, setUpdate);
    console.log(update);
    if (update.modifiedCount === 0) {
      return res.status(200).json({ data: req.body, message: " error " });
    }

    const result = await db2
      .collection("ReservationsId")
      .insertOne({ _id: uuidv4(), ...req.body });
    console.log(result);
    return res.status(200).json({ status: 200, data: result });
  } catch (err) {
    res.status(500).json(err.message);
    client.close();
  }
};

const addUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("Users");
  const { userId } = req.params;
  try {
    await client.connect();
    let findUser = await db.collection("user").findOne({ _id: userId });

    if (!findUser) {
      await db.collection("user").insertOne({ _id: userId });
      return res.status(200).json("user created");
    } else {
      res.status(200).json("user exists");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  client.close();
};

const getReservation = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const email = req.params.email;
  try {
    await client.connect();
    const db = client.db("Reservation");
    const data = await db
      .collection("ReservationsId")
      .find({ email: email })
      .toArray();
    res.status(200).json({
      status: 200,
      result: data,
      message: "user's Reservations",
    });
    console.log(data);
  } catch (error) {
    console.log(err);
    res.status(500).json(err);
  }
  client.close();
};

const deleteReservation = async (req, res) => {
  const { _id } = req.body;
  console.log(_id);
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("Reservation");
    const result = await db
      .collection("ReservationsId")
      .deleteOne({ _id: _id });
    await db
      .collection("ReservationsId")
      .updateOne({ _id: _id }, { $set: { isAvailable: true } });
    res.status(200).json({
      status: 200,
      data: result,
      message: "Document deleted successfully",
    });
  } catch (err) {
    res.status(500).json(err);
    client.close();
  }
};

// const updateReservation = async (req, res) => {
//   const { _id, newReservation } = req.body;
//   const client = new MongoClient(MONGO_URI, options);
//   try {
//     await client.connect();
//     const db = client.db("Reservation");
//     const currentReservation = await db
//       .collection("ReservationsId")
//       .findOne({ _id: _id });

//     if (!currentReservation) {
//       return res.status(404).json({
//         status: 404,
//         message: "Reservation not found",
//       });
//     }

//     const updatedReservation = { ...currentReservation, isAvailable: true };
//     await db
//       .collection("ReservationsId")
//       .updateOne({ _id: _id }, { $set: updatedReservation });

//     const newReservation = { ...newReservation, isAvailable: false };
//     const result = await db
//       .collection("ReservationsId")
//       .insertOne(newReservation);

//     res.status(200).json({
//       status: 200,
//       data: result,
//       message: "Reservation updated successfully",
//     });
//   } catch (err) {
//     res.status(500).json(err);
//     client.close();
//   }
// };

module.exports = {
  getOutdoor,
  getIndoor,
  getIndoorById,
  getOutdoorById,
  addReservation,
  addUser,
  getReservation,
  deleteReservation,
};
