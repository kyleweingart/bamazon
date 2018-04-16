var mysql = require("mysql");
var inquirer = require("inquirer");
var itemIDArray = [];
var chosenItem;
var chosenQuantity;

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
  console.log("connected as id " + connection.threadId);
  displayProducts();
});

function displayProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log(
      "Items Available for Sale:" +
        "\n" +
        "======================================="
    );
    for (var i = 0; i < res.length; i++) {
      // console.log(res);
      itemIDArray.push(res[i].item_id);
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
          "==============================="
      );
    }
    promptCustomer();
   
  });
}

function promptCustomer() {
  inquirer
    .prompt([
      {
        name: "productID",
        type: "input",
        message: "What is the Item ID of the product you would like to buy?"
        
      },
      {
        name: "productNumber",
        type: "input",
        message: "How many units of the product would you like to buy?"
      }
    ])

    .then(function(answer) {
     

      for (var i = 0; i < itemIDArray.length; i++) {
        if (itemIDArray[i] == answer.productID) {
          chosenItem = itemIDArray[i];
          chosenQuantity = parseInt(answer.productNumber);
          console.log("total is " + chosenQuantity);
          console.log(chosenItem + "this works");
          checkStore();
          break;
        }
      }
      if (typeof chosenItem === "undefined") {
        console.log(
          "No product exists with that ID. Please pick another product."
        );
        promptCustomer();
      }
    });
}

function checkStore() {
  console.log("yep");
  connection.query(
    "SELECT * FROM PRODUCTS WHERE ?",
    {
      item_id: chosenItem
    },
    function(err, res) {
      if (err) throw err;
    //   console.log(res);
    //   console.log(res[0].stock_quantity);
      if (res[0].stock_quantity < chosenQuantity) {
        console.log(
          "Insufficient Quantity! There are only " +
            res[0].stock_quantity +
            " available. Please reenter the quantity you want to buy."
        );
        promptCustomer();
      } else {
        fufillOrder();
      }
    }
  );

  
}

function fufillOrder() {

}
