var mysql = require("mysql");
var inquirer = require("inquirer");
var itemIDArray = [];

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
    // connection.end();
  });
}

function promptCustomer() {
    inquirer
    .prompt([{
      name: "productID",
      type: "input",
      message: "What is the Item ID of the product you would like to buy?",
    //   choices: ["POST", "BID"]
    }, 
    {
      name: "productNumber",
      type: "input",
      message: "How many units of the product would you like to buy?"

    }
    ])

    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      var chosenItem;
      for (var i = 0; i < itemIDArray.length; i++){
          if (itemIDArray[i] == answer.productID) {
            chosenItem = itemIDArray[i];
            console.log(chosenItem + "this works");
            break;
           
        
          }
          
          }
        if (typeof chosenItem === "undefined"){
            console.log("No product exists with that ID. Please pick another.")
            promptCustomer();
        }

        }
     


    )};