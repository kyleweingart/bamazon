// REQUIRE PACKAGES
// ======================================================================================

var mysql = require("mysql");
var inquirer = require("inquirer");

// DECLARE VARIABLES
// ======================================================================================

// var itemIDArray = [];
// var chosenItem;
// var chosenQuantity;
// var stockQuantity;
// var totalPrice;

// CREATE DATABASE CONNECTION
// =======================================================================================

var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  // console.log("connected as id " + connection.threadId);
  displayMenuOptions();
});

// FUNCTIONS
// ==========================================================================================

function displayMenuOptions() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View Products for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "View Products for Sale":
          productsView();
          break;
  
        case "View Low Inventory":
          lowInventoryView();
          break;
  
        case "Add to Inventory":
          addInventory();
          break;
  
        case "Add New Product":
          addProduct();
          break;
        }
      });
  }

 function productsView() {
      console.log("productsView function");
  }
  
  function lowInventoryView() {
    console.log("lowinventoryView function");
}

function addInventory() {
    console.log("addInventory function");
}

function addProduct() {
    console.log("addProduct function");
}


