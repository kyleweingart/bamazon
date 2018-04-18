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
  inquirer
    .prompt([
      {
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

    .then(function(answer) {
      chosenProduct = answer.productName;
      chosenQuantity = answer.productQuantity;
      connection.query(
        "UPDATE `PRODUCTS` SET `stock_quantity` = `stock_quantity` + ? WHERE `product_name` = ?",
        [chosenQuantity, chosenProduct],
        function(err, res) {
          if (err) throw err;

          console.log(res.affectedRows);
        // THIS is where I'm currently at- I need to make sure the query is working and then display the update. I tested and it seems to update
        // the database but there are issues and may need some debugging/error validation for user inputs. 

        //   console.log(
        //     "Item ID: " +
        //       res[0].item_id +
        //       "\n" +
        //       "Product Name: " +
        //       res[0].product_name +
        //       "\n" +
        //       "Quantity: " +
        //       res[0].stock_quantity +
        //       "\n" +
        //       "==============================="
        //   );
        }
      );
    });
}

// connection.query(
//     "UPDATE products SET ? WHERE ?",
//     [
//       {
//         stock_quantity: stockQuantity - chosenQuantity
//       },
//       {
//         product_name: chosenItem
//       }
//     ],
//     function(err, res) {
//       console.log(
//         "Total Price for your order is $" +
//           totalPrice +
//           "\n" + "==============================" + "\n" +
//           res.affectedRows +
//           " product updated!"
//       );
//     }
//   );

function addProduct() {
  console.log("addProduct function");
}
