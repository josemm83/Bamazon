var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3000,
    user: "root",
    password: "password",
    database: "bamazonDB"
});

function managerMenu(){
    inquirer.prompt({
        type: "list",
        name: "response",
        choices: ["View Products for Sale","View Low Inventory", "Add to Inventory", "Add New Product"],
        message: "Choose an option"
    }).then(function(answer){
        // console.log(answer);
        switch(answer.response){
            case "View Products for Sale": 
                pos();
                break;
            case "View Low Inventory":
                vli();
                break;
            case "Add to Inventory":
                ati();
                break;
            case "Add New Product":
                anp();
                break;
        }
    });
}

function pos(){//print everything in database
//console.log("POS works.")
    connection.query("SELECT * FROM products", function(err, results){
        if(err) throw err;
        for (var i = 0; i < results.length; i ++){
            console.log("Item Id #: " + results[i].item_id + "\nProduct: " + results[i].product_name + 
            "\nDepartment: " + results[i].department_name + "\nPrice $" + results[i].price + "\nStock Available: " + 
            results[i].stock_quantity + "\n");
        }
        managerMenu();
    });
}

function vli(){ // views low inventory
//console.log("VLI works.")
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, results){
        if(err) throw err;
        for (var i = 0; i < results.length; i++){
            console.log("Item ID: " + results[i].item_id + "\nItem:" + results[i].product_name + 
            " is low on inventory. Please restock soon!\n");
        }
        managerMenu();
    });
}

function ati(){ //restocks item to inventory
//console.log("ATI works.")
    var q; 
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
            message: "Which item would you like to add inventory to?"
            },
            {
                type: "input",
                name: "quantity",
                message: "How many did you want to add?"
            }]).then(function(err, res){
                if(err) throw err;
                connection.query("UPDATE products SET stock_quantity = stock_quantity + ? WHERE product_name = ?",  
                [res.quantity, res.choice]);
                console("Item " + res.choice + " has ")
            });
        managerMenu();
    });
}

function anp(){  //adds a new item into the database
//console.log("ANP works.")
    managerMenu();
}

managerMenu();