#!/usr/bin/env node

const program = require("commander");
const { prompt } = require("inquirer");

const {
  addUser,
  findUser,
  updateUser,
  deleteUser,
  listUsers,
} = require("./index");

const questions = [
  {
    type: "input",
    name: "firstname",
    message: "Customer First Name",
  },
  {
    type: "input",
    name: "lastname",
    message: "Customer Last Name",
  },
  {
    type: "input",
    name: "email",
    message: "Customer Email",
  },
  {
    type: "input",
    name: "phone",
    message: "Customer Phone Number",
  },
];

program.version("1.0.0").description("CLI Interface Management");

/* program
  .command("add <firstname> <lastname> <email> <phone>")
  .alias("a")
  .description("Add a user")
  .action((firstname, lastname, email, phone) => {
    addUser({ firstname, lastname, email, phone });
  }); */

// Add Command
program
  .command("add")
  .alias("a")
  .description("Add a user")
  .action(() => {
    prompt(questions).then((answers) => addUser(answers));
  });

// Find Command
program
  .command("find <name>")
  .alias("f")
  .description("Find a user")
  .action((name) => {
    findUser(name);
  });

// Update Command
program
  .command("update <_id>")
  .alias("u")
  .description("Update a user")
  .action((_id) => {
    prompt(questions).then((answers) => updateUser(_id, answers));
  });

// Delete Command
program
  .command("delete <_id>")
  .alias("d")
  .description("Delete a user")
  .action((_id) => {
    deleteUser(_id);
  });

// List Command
program
  .command("list")
  .alias("l")
  .description("List all the users")
  .action(() => {
    listUsers();
  });

program.parse(process.argv);
