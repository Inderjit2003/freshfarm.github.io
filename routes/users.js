var express = require('express');
const session = require("express-session");
const {pin} = require("nodemon/lib/version");
const mysql = require("mysql");
var router = express.Router();

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

router.get("/thank-you", (req, res) => {
    res.render("users/thank_you");
});

router.post("/place-new-order", (req, res) => {
    var city = req.body.city;
    var pincode = req.body.pincode;
    var address = req.body.address;
    var remarks = req.body.remarks;
    var payment_mode = req.body.payment_mode;
    var grandTotal = req.body.grandTotal;
    var username = session.userName;

    var remarks_2 = "";

    if (remarks == "") {
        remarks_2 = null;
    } else {
        remarks_2 = `"${remarks}"`;
    }

    var payment_status = "";

    if (payment_mode == "COD") {
        payment_status = "Pending";
    } else {
        payment_status = "Complete";
    }

    var orderSQL = `INSERT INTO orders(grand_total, payment_mode, city, pincode, address, remarks, order_status, username, payment_status) 
                    VALUES("${grandTotal}", "${payment_mode}","${city}", "${pincode}", "${address}", ${remarks_2}, "Pending", "${username}", "${payment_status}")`;
    connection.query(orderSQL, (error, row) => {
        if (error) {
            res.send("error");
        } else {
            // console.log(row);
            var lastInserted_id = row.insertId;

            // console.log(session.cart);

            var cart = session.cart;

            for (var i = 0; i < cart.length; i++) {
                // console.log(cart[i]);
                var id = cart[i].id;
                var p_name = cart[i].product_name;
                var price = cart[i].price;
                var discount = cart[i].discount;
                var discountPrice = cart[i].discountPrice;
                var quantity = cart[i].quantity;

                var detailsSQL = `INSERT INTO order_details(price, discount, discounted_price, quantity, product_id, order_id)
                                  VALUES("${price}", "${discount}", "${discountPrice}", "${quantity}", ${id}, ${lastInserted_id})`;
                connection.query(detailsSQL, (err) => {
                    if (err) {
                        console.log(err);
                        // res.send("error");
                    }
                });
            }

            if (payment_mode == "COD") {
                session.cart = undefined;
                res.send("success");
            } else {
                session.bill_id = lastInserted_id;
                session.totalAmount = grandTotal;
                res.send("online");
            }
        }
    });
});

router.get("/payment_action", (req, res) => {
    var payment_id = req.query.payment_id;
    if (payment_id == "") {
        res.send("failed");
    } else {
        var bill_id = session.bill_id;
        var updateSQL = `UPDATE orders SET ref_id="${payment_id}" WHERE id= ${bill_id}`;
        connection.query(updateSQL, (err) => {
            if (err) {
                res.send("error");
            } else {
                session.bill_id = undefined;
                session.totalAmount = undefined;
                session.cart = undefined;

                res.send("success");
            }
        });
    }
});

router.get("/cancel-my-order", (req, res) => {
    var oid = req.query.oid;

    var shipOrder = `UPDATE orders SET order_status="Cancelled" WHERE id=${oid}`;
    // console.log(shipOrder);
    connection.query(shipOrder, (error) => {
        if (error) {
            res.send("error");
        } else {
            res.send("success");
        }
    });
});

router.get("/fetch-my-order", (req, res) => {
    var username = session.userName;

    var pendingOrders = `SELECT *, DATE_FORMAT(date_time, "%W %M %e %Y %r") as date_time  FROM orders WHERE username = "${username}"`;
    connection.query(pendingOrders, (error, data) => {
        if (error) {
            res.send("error");
        } else {
            res.send(data);
        }
    });
});

router.get("/my-orders", (req, res) => {
    if (session.userName != undefined) {
        res.render("users/my-orders");
    } else {
        res.redirect("/user-login")
    }
});

router.get("/razorpay", (req, res) => {
    if (session.userName != undefined) {
        res.render("users/razorpay", {totalAmount: session.totalAmount});
    } else {
        res.redirect("/user-login")
    }
});

router.get("/user-logout", (req, res) => {
    session.userName = undefined;
    session.fullname = undefined;
    res.redirect("/user-login")
});

router.get("/change-password", (req, res) => {
    if (session.userName != undefined) {
        res.render('users/change_password');
    } else {
        res.redirect("/user-login")
    }
});

router.get('/', function (req, res, next) {
    if (session.userName != undefined) {
        res.render('users/user_home', {username: session.fullname});
    } else {
        res.redirect("/user-login")
    }
});

module.exports = router;
