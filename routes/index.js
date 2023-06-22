var express = require('express');
var router = express.Router();
var session = require("express-session");

var mysql = require("mysql");
const {log} = require("debug");
const {add} = require("nodemon/lib/rules");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: null,
    database: "freshfarm"
});

connection.connect(function (error) {
    if (error) throw error;
    console.log("Database Connection Created");
});


router.get("/check-session-created", (req, res) => {
    // console.log(session.username);
    if (session.username == undefined) {
        res.redirect("/admin-login");
    } else {
        res.send(session.username);
    }
});

router.get("/test-session", (req, res) => {
    session.username = "John";
    res.send("Session Created.");
});

// ------------------------------------
// ------------------------------------

router.get("/index-2", (req, res) => {
    res.render("index_new");
});


router.get("/check-user-session", (req, res) => {
    if (session.userName == undefined) {
        res.redirect("/user-login");
    } else {
        res.redirect("/checkout");
    }
});

router.get("/checkout", (req, res) => {
    if (session.userName != undefined) {
        res.render("checkout");
    } else {
        res.redirect("/user-login");
    }
});

router.get("/shopping-cart", (req, res) => {
    res.render("shopping-cart");
});

router.post("/user-login", (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    var loginSQL = `SELECT * FROM users WHERE username="${username}" AND password="${password}"`;
    connection.query(loginSQL, (error, data) => {
        if (error) {
            res.send("error");
        } else {
            // console.log(data);
            if (data.length > 0) {
                session.fullname = data[0].name;
                session.userName = username;
                res.send("success");
            } else {
                res.send("invalid");
            }
        }
    });
});

router.get("/user-login", (req, res) => {
    res.render("user_login");
});

router.post("/user-signup", (req, res) => {
    // console.log(req.body);

    var username = req.body.username;
    var email = req.body.email;
    var name = req.body.name;
    var password = req.body.password;
    var confirm_password = req.body.confirm;
    var gender = req.body.gender;
    var address = req.body.address;
    // console.log(req.files == null);

    if (username == "" || email == "" || name == "" || password == "" || confirm_password == "" || address == "") {
        res.send("empty");
    } else if (req.files == null) {
        res.send("photo");
    } else {
        if (password != confirm_password) {
            res.send("notMatched");
        } else {
            var selectSQL = `SELECT * FROM users WHERE username="${username}"`;
            connection.query(selectSQL, (e, data) => {
                if (e) {
                    res.send("error");
                } else {
                    // console.log(data);
                    if (data.length > 0) {
                        res.send("userExist");
                    } else {
                        var photo = req.files.photo;
                        var serverPath = `public/users/${photo.name}`;
                        var databasePath = `users/${photo.name}`;
                        photo.mv(serverPath, (error) => {
                            if (error) {
                                res.send("notUploaded");
                            } else {
                                var insertUser = `INSERT INTO users(username, password, email, name, gender, photo, address)
                                  VALUES("${username}","${password}","${email}", "${name}", "${gender}", "${databasePath}","${address}")`;
                                connection.query(insertUser, (err) => {
                                    if (err) {
                                        res.send("error");
                                    } else {
                                        res.send("success");
                                    }
                                });
                            }
                        });
                    }
                }
            });

        }
    }
});

router.get("/user-signup", (req, res) => {
    res.render("user_signup");
});

router.post("/add-to-cart", (req, res) => {
    // console.log(req.body.productObject);
    var action = req.body.action;
    console.log(action);

    var cartArray = [];

    if (session.cart != undefined) {
        cartArray = session.cart;
    }

    if (action == "add") {
        var productObject = JSON.parse(req.body.productObject);

        var product_name = productObject.product_name;
        var price = productObject.price;
        var discount = productObject.discount;
        var description = productObject.description;
        var photo = productObject.photo;
        var id = productObject.id;
        var discountPrice = Math.round(price - (price * discount) / 100);

        var cartObject = {
            id: id,
            product_name: product_name,
            price: price,
            discount: discount,
            description: description,
            photo,
            discountPrice,
            quantity: 1
        }

        var isExist = false;

        for (var item of cartArray) {
            if (item.id == id) {
                isExist = true;
                break;
            }
        }

        if (isExist) {
            res.send("exist");
        } else {
            cartArray.push(cartObject);
            session.cart = cartArray;
            res.send("success");
        }

    }
    /*
   Quantity Update
   */
    else if (action == "plus" || action == "minus") {
        var pid = req.body.pid;

        for (var i = 0; i < cartArray.length; i++) {
            if (cartArray[i].id == pid) {
                if (action == "plus") {
                    cartArray[i].quantity += 1;
                } else {
                    cartArray[i].quantity -= 1;
                }
            }
        }

        session.cart = cartArray;
        session.grandTotal = Calculate_GrandTotal(cartArray);
        res.send("updated");
    } else if (action == "remove") {
        var pid = req.body.pid;

        var temp_Array = [];
        temp_Array = cartArray.filter(function (value) {
            if (value.id != pid) {
                return value;
            }
        });
        cartArray.push(temp_Array);

        // console.log(temp_Array.length);

        if (temp_Array.length > 0) {
            session.cart = temp_Array;
        } else {
            session.cart = undefined;
        }

        res.send("removed");
    }
    /*
    View Products in Session Cart
    */
    else {
        res.send(session.cart);
    }
});

function Calculate_GrandTotal(cart) {
    var total = 0;

    for (var item of cart) {
        total += item.discountPrice * item.quantity;
    }

    return total;
}

router.get("/get-products", (req, res) => {
    var selectSQL = `select * from products`;
    connection.query(selectSQL, (error, rows) => {
        if (error) {
            res.send("error");
        } else {
            res.send(rows);
        }
    });
});

router.get("/logout-admin", (req, res) => {
    session.adminName = undefined;
    res.send("success");
});

router.post("/admin-change-password", (req, res) => {
    var current = req.body.current;
    var newPassword = req.body.newPassword;
    var confirm = req.body.confirmPassword;
    var email = session.adminEmail;

    var checkOldPassword = `SELECT * FROM admin WHERE email="${email}"`;
    connection.query(checkOldPassword, (error, row) => {
        if (error) {
            res.send("error");
        } else {
            // console.log(row);
            var password = row[0].password;
            // console.log(password);
            if (password != current) {
                res.send("invalid");
            } else {
                var updateSQL = `UPDATE admin SET \`password\`="${newPassword}" WHERE email="${email}"`;
                connection.query(updateSQL, (error) => {
                    if (error) {
                        res.send("error");
                    } else {
                        res.send("updated");
                    }
                });
            }
        }
    });
});

router.get("/admin-change-password", (req, res) => {
    if (session.adminName == undefined) {
        res.redirect("/admin-login");
    } else {
        res.render("admin_change_password");
    }
});

router.get("/admin-home", (req, res) => {
    if (session.adminName == undefined) {
        res.redirect("/admin-login")
    } else {
        res.render("admin_home", {name: session.adminName});
    }
})

// Authenticate Admin
router.post("/admin-login", (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    // console.log(email, password);

    var loginSQL = `SELECT * FROM admin WHERE email="${email}" AND password="${password}"`;
    connection.query(loginSQL, (error, data) => {
        if (error) {
            res.send("error");
        } else {
            // console.log(data);

            if (data.length > 0) {
                session.adminEmail = email;
                session.adminName = data[0].name;

                res.send("success");
            } else {
                res.send("invalid");
            }
        }
    });
});

router.get("/admin-login", (req, res) => {
    res.render("admin_login");
});

router.get("/view-product", (req, res) => {
    var selectProduct = `SELECT * FROM products ORDER BY id DESC`;
    connection.query(selectProduct, (error, rows) => {
        if (error) {
            console.log(error);
            res.send("error");
        } else {
            res.send(rows);
        }
    });
});

router.post("/add-product", (req, res) => {
    var subcategory = req.body.subcategory;
    var productName = req.body.productName;
    var price = req.body.price;
    var discount = req.body.discount;
    var description = req.body.description;
    var photo = req.files.image;
    // console.log(photo);

    var filePath = `public/products/${photo.name}`;
    var databasePath = `products/${photo.name}`;

    photo.mv(filePath, function (error) {
        if (error) {
            console.log(error);
        }
    });

    var insertSQL = `INSERT INTO products(product_name, photo, price, discount, description, subcategory_id) 
                     VALUES("${productName}", "${databasePath}","${price}","${discount}","${description}",${subcategory})`;
    console.log(insertSQL)
    connection.query(insertSQL, (error) => {
        if (error) {
            // console.log(error);
            res.send("error");
        } else {
            res.send("added");
        }
    });
});

router.get("/fetch-subcategory-related-to-category", (req, res) => {
    var categoryid = req.query.category_id;

    var selectSQL = `SELECT * FROM subcategory WHERE category=${categoryid}`;
    connection.query(selectSQL, (error, rows) => {
        if (error) {
            console.log(error);
        } else {
            res.send(rows);
        }
    });
});

router.get("/manage-product", (req, res) => {
    if (session.adminName == undefined) {
        res.redirect("/admin-login")
    } else {
        var getCategories = `SELECT * FROM category ORDER BY category_name ASC`;
        connection.query(getCategories, (error, rows) => {
            if (error) {
                console.log(error);
            }
            res.render("products", {category: rows});
        });
    }
})

router.post("/update-sub-category", (req, res) => {
    var category = req.body.category;
    var subCategory = req.body.subCategory;
    var subCategory_ID = req.body.subCategory_ID;

    var updateSQL = `UPDATE subcategory SET subcategory_name="${subCategory}", category=${category} WHERE subcategory_id=${subCategory_ID}`;
    connection.query(updateSQL, (error) => {
        if (error) {
            res.send("error");
        } else {
            res.send("updated");
        }
    })
})

router.get("/delete-sub-category", (req, res) => {
    var id = req.query.id;

    var deleteSQL = `DELETE FROM subcategory WHERE subcategory_id=${id}`;
    connection.query(deleteSQL, (error) => {
        if (error) {
            res.send("error");
        } else {
            res.send("deleted");
        }
    });
});

router.get("/fetch-sub-category-from-server", (req, res) => {
    var selectSQL = `SELECT * FROM subcategory ORDER BY subcategory_id DESC`;
    connection.query(selectSQL, (error, rows) => {
        if (error) {
            res.send("error");
        } else {
            res.send(rows);
        }
    });
});

router.post("/add-sub-category", (req, res) => {
    var categoryID = req.body.category;
    var subCategory = req.body.subCategory;
    var insertSQL = `INSERT INTO subcategory(subcategory_name, category) VALUES("${subCategory}","${categoryID}")`;
    connection.query(insertSQL, (error) => {
        if (error) {
            res.send("error");
        } else {
            res.send("added");
        }
    });
});

router.get("/manage-sub-category", (req, res) => {

    if (session.adminName == undefined) {
        res.redirect("/admin-login");
    } else {
        var getCategories = `SELECT * FROM category ORDER BY category_name ASC`;
        connection.query(getCategories, (error, rows) => {
            if (error) {
                console.log(error);
            }
            res.render("sub_category", {category: rows});
        });
    }
});

router.post("/update-category", (req, res) => {
    // console.log(req.body);

    var categoryName = req.body.category;
    var categoryID = req.body.category_id;

    var updateSQL = `UPDATE category SET category_name="${categoryName}" WHERE category_id=${categoryID}`;
    connection.query(updateSQL, (error) => {
        if (error) {
            res.send("error");
        } else {
            res.send("updated");
        }
    });
});

router.post("/delete-category", (req, res) => {
    // console.log(req.body);

    var catID = req.body.category_id;

    var deleteSQL = `DELETE FROM category WHERE category_id= ${catID}`;
    connection.query(deleteSQL, (error) => {
        if (error) {
            res.send("error");
        } else {
            res.send("deleted");
        }
    });
});

router.get("/get-category-from-server", (req, res) => {
    var selectSQL = `SELECT * FROM category`;
    connection.query(selectSQL, (error, data) => {
        if (error) {
            console.log(error);
            res.send("error");
        } else {
            // console.log(data);
            res.send(data);
        }
    });
});

router.post("/add-category", (req, res) => {
    var category_name = req.body.category;

    var insertSQL = `INSERT INTO category(category_name) VALUES("${category_name}")`;
    connection.query(insertSQL, function (error) {
        if (error) {
            console.log(error);
            res.send("error");
        } else {
            res.send("success");
        }
    });
});

router.get("/manage-category", (req, res) => {
    var selectSQL = `SELECT * FROM category`;
    connection.query(selectSQL, (error, data) => {
        if (error) {
            console.log(error);
        } else {
            console.log(data);
            res.render("category");
            res.render("category", {category: data});
        }
    });

    if (session.adminName == undefined) {
        res.redirect("/admin-login")
    } else {
        res.render("category");
    }
});

router.get("/fetch-products-acc-to-category", (req, res) => {
    // console.log(req.query);
    let id = req.query.id;

    let Query = `SELECT * FROM products INNER JOIN subcategory ON products.subcategory_id=subcategory.subcategory_id INNER JOIN category ON subcategory.category=category.category_id WHERE category.category_id=${id}`;
    // console.log(Query);
    connection.query(Query, (e , rows) =>{
        if(e) {
            console.log(e);
            return res.send("error");
        }

        res.send(rows);
    });
})

router.get("/about-us", (req, res) => {
    res.render('about');
})

router.get('/', function (req, res) {

    let Query = `SELECT * FROM category  
ORDER BY category_id DESC LIMIT 3`;
    connection.query(Query, (e, rows) => {
        if (e) {
            console.log(e);
        }
        console.log(rows);
        res.render('index', {title: "Home Page", rows});
    });
});

module.exports = router;
