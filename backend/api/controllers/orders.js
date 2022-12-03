const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const Order = require("../models/order");
const ProductDetail = require("../models/productDetail");
const Product = require("../models/product");
const User = require("../models/user");

require("dotenv").config();

exports.orders_get_all = (req, res, next) => {
  Order.find()
    .populate("user")
    .populate("products.productDetail")
    .exec()
    .then((docs) => {
      res.status(200).json({
        count: docs.length,

        orders: docs.map((doc) => {
          const { password, ...other } = doc.user._doc;

          return {
            _id: doc._id,
            products: doc.products,
            amount: doc.amount,
            address: doc.address,
            status: doc.status,
            user: { ...other },
            paymentMethod: doc.paymentMethod,
            paymentStatus: doc.paymentStatus,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
          };
        }),
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.orders_create_order = async (req, res, next) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "VND",
  });

  var today = new Date();
  var date =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + " " + time;

  let output = `
  <table width='500' border = '1'>
  <tr><th>Number</th><th>Product</th><th>Size</th><th>Color</th><th>Price</th><th>Quantity</th><th>Total</th></tr>
  `;
  req.body.products.map((product, index) => {
    output += `<tr><td>${index + 1}</td><td>${product.name}</td><td>${
      product.size
    }</td><td>${product.color}</td><td>${formatter.format(
      product.price
    )}</td><td>${product.quantity}</td><td>${formatter.format(
      product.total
    )}</td></tr>`;
  });
  output += "</table>";

  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }

  User.findOne({ _id: req.body.user }).then((user) => {
    let content = `<b>Order information</b><br><b>Booking time: </b>${dateTime}<br><b>User: </b>${
      user.name
    }<br><b>Address: </b>${
      req.body.paymentMethod === "cash"
        ? req.body.address
        : req.body.address.line1
    }<br><b>Phone: </b>${user.phone}<br><b>Payment method: </b>${
      req.body.paymentMethod === "cash"
        ? req.body.paymentMethod
        : req.body.paymentMethod.brand
    }<br><b>Payment status: </b>${
      req.body.paymentMethod === "cash" ? "unpaid" : req.body.paymentStatus
    }<br>`;
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ngocha1999.hh@gmail.com", // generated ethereal user
        pass: "emuuveecuceuebun", // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    let mailOptions = {
      from: '"Shop Nike" <ngocha1999.hh@gmail.com>', // sender address
      to: `${user.email}`, // list of receivers
      subject: "Orders success!!!", // Subject line
      text: "Hello world?", // plain text body
      html: `${content}${output}<br/><span><b>Amount: </b></span><span>${formatter.format(
        req.body.amount
      )}</span><br><b>Thank you for your purchase!!!</b>`, // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }

      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
  });
};

exports.orders_get_orderbyUserId = (req, res, next) => {
  Order.find({ user: req.params.userId })
    .populate({
      path: "products.productDetail",
      populate: { path: "product" },
    })
    .exec()
    .then((order) => {
      if (!order) {
        return res.status(404).json({
          message: "order not found",
        });
      }
      res.status(200).json({
        order: order,
        request: {
          type: "GET",
          url: process.env.NODEJS_APP_URL + "/api/orders",
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.orders_get_orderbyStatus = (req, res, next) => {
  Order.find({ status: req.params.status })
    .populate("user")
    .populate({
      path: "products.productDetail",
      populate: { path: "product" },
    })
    .exec()
    .then((order) => {
      if (!order) {
        return res.status(404).json({
          message: "order not found",
        });
      }
      res.status(200).json({
        orders: order,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.orders_get_order = (req, res, next) => {
  Order.findById(req.params.orderId)
    .populate({
      path: "products.productDetail",
      populate: { path: "product" },
    })
    .exec()
    .then((order) => {
      if (!order) {
        return res.status(404).json({
          message: "order not found",
        });
      }
      res.status(200).json({
        order: order,
        request: {
          type: "GET",
          url: process.env.NODEJS_APP_URL + "/api/orders",
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.orders_get_orderInMonth = async (req, res, next) => {
  const productDetail = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productDetail && {
            products: { $elemMatch: { productDetail } },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.orders_handle_order = (req, res, next) => {
  Order.findByIdAndUpdate(req.params.orderId, {
    status: req.body.status,
  })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "order update",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.orders_delete_order = (req, res, next) => {
  Order.remove({ _id: req.params.orderId })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "order deleted",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
