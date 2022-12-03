const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require('path');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');

app.use(cookieParser());

const productRoutes = require("./api/routes/products");
const productDetailRoutes = require("./api/routes/productDetails");
const cartRoutes = require("./api/routes/carts");
const userRoutes = require('./api/routes/user');
const categoryRoutes = require('./api/routes/categories');
const slideRoutes = require('./api/routes/sliders');
const sizeRoutes = require('./api/routes/sizes');
const saleRoutes = require('./api/routes/sales');
const orderRoutes = require('./api/routes/orders');
const commentRoutes = require('./api/routes/comments');
const sendMailRoutes = require('./api/routes/sendMails');
const stripeRoutes = require('./api/routes/stripe');
const defaultRoutes = require('./api/routes/default');

const db = require("./config/db");
db.connect();

app.set("view engine", "ejs");
app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const oneDay = 1000 * 60 * 60 * 24;
app.use(
  sessions({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
  })
);
// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))
app.use('/vendor', express.static(path.resolve(__dirname, "assets/vendor")))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});


app.use('/', defaultRoutes);

app.use('/dashboard', defaultRoutes);

app.use('/list-product', defaultRoutes);
app.use('/list-product-detail', defaultRoutes);
app.use('/add-product', defaultRoutes);
app.use('/update-product', defaultRoutes);
app.use('/add-product-detail', defaultRoutes);
app.use('/update-product-detail', defaultRoutes);

app.use('/list-category', defaultRoutes);
app.use('/add-category', defaultRoutes);
app.use('/update-category', defaultRoutes);

app.use('/list-slider', defaultRoutes);
app.use('/add-slider', defaultRoutes);
app.use('/update-slider', defaultRoutes);

app.use('/list-size', defaultRoutes);
app.use('/add-size', defaultRoutes);
app.use('/update-size', defaultRoutes);

app.use('/list-sale', defaultRoutes);
app.use('/add-sale', defaultRoutes);
app.use('/update-sale', defaultRoutes);

app.use('/list-order', defaultRoutes);
app.use('/list-order-pending', defaultRoutes);
app.use('/list-order-complete', defaultRoutes);
app.use('/list-order-cancel', defaultRoutes);
app.use('/order-detail', defaultRoutes);

app.use('/list-user', defaultRoutes);

app.use('/list-comment', defaultRoutes);


// Routes which should handle requests
//api

app.use("/api/products", productRoutes);
app.use("/api/productDetails", productDetailRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/user", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/sliders", slideRoutes);
app.use("/api/sizes", sizeRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/checkout", stripeRoutes);
app.use("/api/sendmail", sendMailRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.render("error");
});


module.exports = app;