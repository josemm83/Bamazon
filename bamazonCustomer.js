var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3000,
    user: "root",
    password: "password",
    database: "bamazonDB"
});

function list(){
    connection.query("SELECT * FROM products", function(err, results){
        if(err) throw err;
        inquirer.prompt([{
            name: "choice",
            type: "rawlist",
            choices: function(){
                var productArray = [];
                for(var i = 0;i < results.length; i++){
                    productArray.push(results[i].product_name);
                }
                return productArray;
            },
            message: "Which product would you like to purchase?"
        },
        {
            type: "input",
            name: "quantity",
            message: "How many did you want?"
        }]).then(function(response){
            var item = response.choice;
            var quantity = response.quantity;
            purchaseItems(item, quantity);
        });
    });
}

function purchaseItems(choice, quantity){
    connection.query("SELECT * FROM products WHERE product_name = ?", [choice], function(err, results){
        if(err) throw err;
        console.log(results);
        if(quantity <= results[0].stock_quantity){
            var total = quantity * results[0].price;
            console.log("Product is in stock!")
            console.log("Total for " + results[0].product_name + " is " + total);
            connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE product_name = ?",  [quantity, choice]);
        }
        else{
            console.log("Insufficient quantity for " + results[0].product_name + 
            "The total quantity is: " + results[0].stock_quantity + " Please try again!");
        }
        list();
    });
}

list();