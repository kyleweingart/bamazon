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
    console.log("Items Available for Sale:" + '\n' + "=======================================")
    for (var i = 0; i < res.length; i++) {
    // console.log(res);
    console.log("Item ID: " + res[i].item_id + '\n' + "Product Name: " + res[i].product_name + '\n' +  "Price: " + res[i].price + '\n' + "===============================" )


    
    }
    connection.end();
  });
}
