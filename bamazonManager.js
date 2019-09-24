var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Breseman9",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id" + connection.threadId);
});

function displayInventory() {
    connection.query('SELECT * FROM Products', function (err, res) {
        if (err) { console.log(err) };
        var theDisplayTable = new Table({
            head: ['Item ID', 'Product Name', 'Category', 'Price', 'Quantity'],
            colWidths: [10, 25, 25, 10, 14]
        });
        for (i = 0; i < res.length; i++) {
            theDisplayTable.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
            );
        }
        console.log(theDisplayTable.toString());
        inquirerForUpdates();
    });
};

// here instead of making the 4 menu options i only made 3. 2 are from hw reccomendation and 1 (restock) is one i decided to make on my own
function inquirerForUpdates() {
    inquirer.prompt([{
        name: "action",
        type: "list",
        message: "Choose an option to manage inventory:",
        choices: ["Restock", "Add New Product", "Remove Old Product"]
    }]).then(function (answers) {
        switch (answers.action) {
            case 'Restock':
                restockRequest();
                break;
            case 'Add New Product':
                addRequest();
                break;
            case 'Remove Old Product':
                removeRequest();
                break;
        }
    });
};

function restockRequest() {
    inquirer.prompt([
        {
            name: "ID",
            type: "input",
            message: "What is the item number of the item you want to restock?"
        },
        {
            name: "Quantity",
            type: "input",
            message: "What is the quantity you want to add?"
        },
    ]).then(function (answers) {
        var quantityAdded = answers.Quantity;
        var IDOfProduct = answers.ID;
        restockInventory(IDOfProduct, quantityAdded);
    });
};

function restockInventory(id, quant) {
    connection.query('SELECT * FROM Products WHERE item_id = ' + id, function (err, res) {
        if (err) { console.log(err) };
        connection.query('UPDATE Products SET stock_quantity = stock_quantity + ' + stock_quantity + 'WHERE item_id =' + item_id);

        displayInventory();
    });
};

function addRequest() {
    inquirer.prompt([

        {
            name: "ID",
            type: "input",
            message: "Add ID #"

        },
        {
            name: "Name",
            type: "input",
            message: "What is name of product you want to stock?"
        },
        {
            name: "Category",
            type: "input",
            message: "What is the category?"
        },
        {
            name: "Price",
            type: "input",
            message: "What is the price?"
        },
        {
            name: "Quantity",
            type: "input",
            message: "What is the quantity you want to add?"
        },

    ]).then(function (answers) {
        var id = answers.Id;
        var name = answers.Name;
        var category = answers.Category;
        var price = answers.Price;
        var quantity = answers.Quantity;
        buildNewItem(id, name, category, price, quantity);
    });
};

function buildNewItem(name, category, price, quantity) {
    connection.query('INSERT INTO products (item_id,product_name,department_name,price,stock_quantity) VALUES("' + id + '","' + name + '","' + category + '",' + price + ',' + quantity + ')');
    displayInventory();
};

function removeRequest() {
    inquirer.prompt([{
        name: "ID",
        type: "input",
        message: "What is the item number of the item you want to remove?"
    }]).then(function (answer) {
        var id = answers.ID;
        removeInventory(id);
    });
};

function removeInventory(id) {
    connection.query('DELETE FROM Products WHERE item_id = ' + id);
    displayInventory();
};

displayInventory();