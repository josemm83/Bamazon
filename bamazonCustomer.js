var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3000,
    user: "root",
    password: "D@rthv@d3r066",
    database: "bamazonDB"
});

function list(){
    var item = [];
    connection.query("SELECT * FROM products", function(err, results){
        if(err) throw err;
        inquirer.prompt([{
            name: "choice",
            type: "rawlist",
            choices: function(){
                var productArray = [];
                for(var i = 0;i < results.length; i++){
                    item.push(results[i]);
                    productArray.push(results[i].product_name);
                }
                return productArray;
            },
            message: "Which product would you like to purchase?"
        },
        {
            type: "confirm",
            name: "price",
            message: "Price of item is: " + results.price + ". Would you like to continue?"
        },
        {
            type: "input",
            name: "quantity",
            message: "How many did you want? Total quantity is: " + results.product_quantity
        }]).then(function(response){

        });
    });
}

function reset(){
    inquirer.prompt({
        name: "choice",
        choices: ["Yes", "No"],
        message: "Would you like to order another item?"
    }).then(function (response){
        if(response){
            return;
        }
        else{
            list();
        }
    });
}

list();