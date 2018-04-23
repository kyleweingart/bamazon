// REQUIRE PACKAGES
// ======================================================================================

var mysql = require("mysql");
var inquirer = require("inquirer");

// DECLARE VARIABLES
// ======================================================================================


var chosenQuantity;


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

connection.connect(function (err) {
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
    .then(function (answer) {
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
  connection.query("SELECT * FROM products", function (err, res) {
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
      message: "What number would you like to use to check inventory quantities?"
    })

    .then(function (answer) {
      chosenQuantity = parseInt(answer.productNumber);
      connection.query(
        "SELECT * FROM `PRODUCTS` WHERE `stock_quantity` <= ?", [chosenQuantity],
        function (err, res) {
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
  inquirer
    .prompt([{
        name: "productName",
        type: "input",
        message: "What product would you like to add inventory to?"
      },
      {
        name: "productQuantity",
        type: "input",
        message: "How much inventory would you like to add?"
      }
    ])

    .then(function (answer) {
      chosenProduct = answer.productName;
      chosenQuantity = answer.productQuantity;
      connection.query(
        "UPDATE `PRODUCTS` SET `stock_quantity` = `stock_quantity` + ? WHERE `product_name` = ?", [chosenQuantity, chosenProduct],
        function (err, res) {
          if (err) throw err;

          console.log(res.affectedRows);
          console.log(chosenQuantity + " " + chosenProduct + " were added to the inventory");

        }
      );
    });
}



function addProduct() {
  inquirer
    .prompt([{
        name: "productName",
        type: "input",
        message: "What product would you like to add?"
      },
      {
        name: "productDepartment",
        type: "input",
        message: "What department would you like to add the product to?"
      },
      {
        name: "productPrice",
        type: "input",
        message: "What is the product price?"
      },
      {
        name: "productQuantity",
        type: "input",
        message: "How much inventory would you like to add?"
      }
    ])

    .then(function (answer) {
      chosenProduct = answer.productName;
      chosenDepartment = answer.productDepartment;
      chosenPrice = answer.productPrice;
      chosenQuantity = answer.productQuantity;
      connection.query(
        "INSERT INTO products SET ?", [{
          product_name: chosenProduct,
          department_name: chosenDepartment,
          price: chosenPrice,
          stock_quantity: chosenQuantity
        }],
        function (err, res) {
          if (err) throw err;


          console.log(chosenProduct + "added");
        }
      );

    });
}