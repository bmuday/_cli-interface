const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const { username, password, database, host, port } = process.env;
const credentials = {
  username,
  password,
  database,
};

const db_connection = `mongodb+srv://${username}:${password}@cluster0.nnbxv.mongodb.net/${database}?retryWrites=true&w=majority`;

mongoose.connect(db_connection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB!");
});
