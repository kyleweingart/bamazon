var mysql = require("mysql");

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
    // connection.end();
  });
}

function promptCustomer() {
    inquirer
    .prompt({
      name: "productID",
      type: "input",
      message: "What is the Item ID of the product you would like to buy?",
    //   choices: ["POST", "BID"]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.postOrBid.toUpperCase() === "POST") {
        postAuction();
      }
      else {
        bidAuction();
      }
    });
}


