const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

//Connect to DB
const db = require("./db");
const mongoose = require("mongoose");

// Import model
const User = require("./models/user");

// Add User
const addUser = (user) => {
  User.create(user).then((user) => {
    console.log("User added!");
    mongoose.connection.close(() => {
      process.exit(0);
    });
  });
};

// Find User
const findUser = (name) => {
  // Make case insensitive
  const search = new RegExp(name, "i");
  User.find({ $or: [{ firstname: search }, { lastname: search }] }).then(
    (user) => {
      console.info(user);
      console.info(`${user.length} ${user.length === 1 ? "match" : "matches"}`);
      mongoose.connection.close(() => {
        process.exit(0);
      });
    }
  );
};

// Update User
const updateUser = (_id, user) => {
  User.updateOne({ _id }, user).then((user) => {
    console.log("User updated!");
    mongoose.connection.close(() => {
      process.exit(0);
    });
  });
};

// Delete User
const deleteUser = (_id) => {
  User.deleteOne({ _id }).then((user) => {
    console.log("User deleted!");
    mongoose.connection.close(() => {
      process.exit(0);
    });
  });
};

// List Users
const listUsers = () => {
  User.find().then((users) => {
    console.info(users);
    console.info(`${users.length} ${users.length === 1 ? "user" : "users"}`);
    mongoose.connection.close(() => {
      process.exit(0);
    });
  });
};

module.exports = {
  addUser,
  findUser,
  updateUser,
  deleteUser,
  listUsers,
};

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
