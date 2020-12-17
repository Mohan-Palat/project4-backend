require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const db = mongoose.connection;
const PORT = process.env.PORT || 8000;



const MONGODB_URI =
	process.env.MONGODB_URL || "mongodb://localhost:27017/" + "project4";

mongoose.connect(MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
});
// Error / success
db.on("error", (err) => console.log(err.message + " is Mongod not running?"));
db.on("connected", () => console.log("mongo connected: ", MONGODB_URI));
db.on("disconnected", () => console.log("mongo disconnected"));
// open the connection to mongo
db.on("open", () => {});

app.use(express.urlencoded({ extended: true })); // extended: false - does not allow nested objects in query strings
app.use(express.json()); // returns middleware that only parses JSON - may or may not need it depending on your project

app.use("/", require("./controllers/songs_controllers.js"));

app.listen(PORT, () =>console.log("Listening on port: ", PORT));