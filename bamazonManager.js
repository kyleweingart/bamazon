// REQUIRE PACKAGES
// ======================================================================================

var mysql = require("mysql");
var inquirer = require("inquirer");

// DECLARE VARIABLES
// ======================================================================================

// var itemIDArray = [];
// var chosenItem;
var chosenQuantity;
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
  //   console.log("productsView function");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log(
      "Product Inventory:" + "\n" + "======================================="
    );
    for (var i = 0; i < res.length; i++) {
      // console.log(res);
      //   itemIDArray.push(res[i].item_id);
      //   console.log(itemIDArray);
      console.log(
        "Item ID: " +
          res[i].item_id +
          "\n" +
          "Product Name: " +
          res[i].product_name +
          "\n" +
          "Price: $" +
          res[i].price +
          "\n" +
          "Quantity: $" +
          res[i].stock_quantity +
          "\n" +
          "==============================="
      );
    }
  });
}

function lowInventoryView() {
  //   console.log("lowinventoryView function");
  inquirer
    .prompt({
      name: "productNumber",
      type: "input",
      message:
        "What number would you like to use to check inventory quantities?"
    })

    .then(function(answer) {
      chosenQuantity = parseInt(answer.productNumber);
      connection.query(
        "SELECT * FROM `PRODUCTS` WHERE `stock_quantity` <= ?",
        [chosenQuantity],
        // how do i do this with less than?
        // {
        //   stock_quantity: < chosenQuantity
        // },
        function(err, res) {
          if (err) throw err;
          console.log(res.length);
          //   stockQuantity = res[0].stock_quantity;
          if (res.length === 0) {
            console.log("There are currently no products with a low inventory");
          } else {
            for (var i = 0; i < res.length; i++) {
              // console.log(res);
              // itemIDArray.push(res[i].item_id);
              //   console.log(itemIDArray);
              console.log(
                "Item ID: " +
                  res[i].item_id +
                  "\n" +
                  "Product Name: " +
                  res[i].product_name +
                  "\n" +
                  "Quantity: " +
                  res[i].stock_quantity +
                  "\n" +
                  "==============================="
              );
            }
          }
        }
      );
    });
}

function addInventory() {
  console.log("addInventory function");
}

function addProduct() {
  console.log("addProduct function");
}
