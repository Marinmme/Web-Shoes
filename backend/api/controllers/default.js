const { default: axios } = require("axios");
require("dotenv").config();

exports.home = (req, res) => {
  function getProductDetails() {
    return axios.get(process.env.NODEJS_APP_URL + "/api/productdetails");
  }

  function getOrdersInCome() {
    return axios.get(process.env.NODEJS_APP_URL + "/api/orders/income");
  }

  function getOrders() {
    return axios.get(process.env.NODEJS_APP_URL + "/api/orders");
  }

  function getComments() {
    return axios.get(process.env.NODEJS_APP_URL + "/api/comments");
  }

  function getUsers() {
    return axios.get(process.env.NODEJS_APP_URL + "/api/user");
  }

  Promise.all([getProductDetails(), getOrders(), getComments(), getUsers(), getOrdersInCome()])
    .then(function (results) {
      const productDetails = results[0].data.count;
      const orders = results[1].data.count;
      const comments = results[2].data.count;
      const users = results[3].data.count;
      const ordersInCome = results[4].data;
      res.render("index", {
        orders: orders,
        productDetails: productDetails,
        comments: comments,
        users: users,
        ordersInCome : ordersInCome,
        username: req.session.name
      });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.login = (req, res) => {
  res.render("login");
};

exports.list_product = (req, res) => {
  axios
    .get(process.env.NODEJS_APP_URL + "/api/products")
    .then(function (response) {
      res.render("list_product", { products: response.data.products, username: req.session.name });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.list_product_detail = (req, res) => {
  axios
    .get(process.env.NODEJS_APP_URL + "/api/productdetails")
    .then(function (response) {
      res.render("list_product_detail", {
        productDetails: response.data.productDetails,
        username: req.session.name
      });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.add_product = (req, res) => {
  axios
    .get(process.env.NODEJS_APP_URL + "/api/categories")
    .then(function (response) {
      res.render("add_product", { categories: response.data.categories, username: req.session.name });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.update_product = (req, res) => {
  var _id = req.query.id;
  function getCategories() {
    return axios.get(process.env.NODEJS_APP_URL + "/api/categories");
  }

  function getProductById() {
    return axios.get(process.env.NODEJS_APP_URL + "/api/products/" + _id);
  }

  Promise.all([getCategories(), getProductById()])
    .then(function (results) {
      const categories = results[0].data.categories;
      const product = results[1].data.product;
      res.render("update_product", {
        product: product,
        categories: categories,
        username: req.session.name
      });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.add_product_detail = (req, res) => {
  axios
    .get(process.env.NODEJS_APP_URL + "/api/products")
    .then(function (response) {
      res.render("add_product_detail", { products: response.data.products, username: req.session.name });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.update_product_detail = (req, res) => {
  var _id = req.query.id;
  function getProducts() {
    return axios.get(process.env.NODEJS_APP_URL + "/api/products");
  }

  function getProductDetailById() {
    return axios.get(process.env.NODEJS_APP_URL + "/api/productdetails/" + _id);
  }

  Promise.all([getProducts(), getProductDetailById()])
    .then(function (results) {
      const products = results[0].data.products;
      const productDetail = results[1].data.productDetail;
      res.render("update_product_detail", {
        productDetail: productDetail,
        products: products,
        username: req.session.name
      });
    })
    .catch((err) => {
      res.send(err);
    });

};

exports.list_category = (req, res) => {
  axios
    .get(process.env.NODEJS_APP_URL + "/api/categories")
    .then(function (response) {
      res.render("list_category", { categories: response.data.categories, username: req.session.name });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.add_category = (req, res) => {
  res.render("add_category", {username: req.session.name});
};

exports.update_category = (req, res) => {
  var _id = req.query.id;
  axios
    .get(process.env.NODEJS_APP_URL + "/api/categories/" + _id)
    .then(function (categorydata) {
      res.render("update_category", { category: categorydata.data.category, username: req.session.name });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.list_user = (req, res) => {
  axios
    .get(process.env.NODEJS_APP_URL + "/api/user")
    .then(function (response) {
      res.render("list_user", { users: response.data.users, username: req.session.name });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.list_comment = (req, res) => {
  axios
    .get(process.env.NODEJS_APP_URL + "/api/comments")
    .then(function (response) {
      res.render("list_comment", { comments: response.data.comments, username: req.session.name });
    })
    .catch((err) => {
      res.send(err);
    });
};


exports.list_slider = (req, res) => {
  axios
    .get(process.env.NODEJS_APP_URL + "/api/sliders")
    .then(function (response) {
      res.render("list_slider", { sliders: response.data.sliders, username: req.session.name });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.add_slider = (req, res) => {
  res.render("add_slider", {username: req.session.name});
};

exports.update_slider = (req, res) => {
  var _id = req.query.id;
  axios
    .get(process.env.NODEJS_APP_URL + "/api/sliders/" + _id)
    .then(function (response) {
      res.render("update_slider", { slider: response.data.slider, username: req.session.name });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.list_size = (req, res) => {
  axios
    .get(process.env.NODEJS_APP_URL + "/api/sizes")
    .then(function (response) {
      res.render("list_size", { sizes: response.data.sizes, username: req.session.name });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.add_size = (req, res) => {
  axios
    .get(process.env.NODEJS_APP_URL + "/api/productDetails")
    .then(function (response) {
      res.render("add_size", { productDetails: response.data.productDetails, username: req.session.name });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.update_size = (req, res) => {
  var _id = req.query.id;
  function getProductDetails() {
    return axios.get(process.env.NODEJS_APP_URL + "/api/productdetails");
  }

  function getSizeById() {
    return axios.get(process.env.NODEJS_APP_URL + "/api/sizes/" + _id);
  }

  Promise.all([getProductDetails(), getSizeById()])
    .then(function (results) {
      const productDetails = results[0].data.productDetails;
      const size = results[1].data.size;
      res.render("update_size", {
        size: size,
        productDetails: productDetails,
        username: req.session.name
      });
    })
    .catch((err) => {
      res.send(err);
    });

};

exports.list_sale = (req, res) => {
  axios
    .get(process.env.NODEJS_APP_URL + "/api/sales")
    .then(function (response) {
      res.render("list_sale", { sales: response.data.sales, username: req.session.name });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.add_sale = (req, res) => {
  res.render("add_sale", {username: req.session.name});
};

exports.update_sale = (req, res) => {
  var _id = req.query.id;
  axios
    .get(process.env.NODEJS_APP_URL + "/api/sales/" + _id)
    .then(function (response) {
      res.render("update_sale", { sale: response.data.sale, username: req.session.name });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.list_order = (req, res) => {
  axios
    .get(process.env.NODEJS_APP_URL + "/api/orders")
    .then(function (response) {
      res.render("list_order", { orders: response.data.orders, username: req.session.name });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.list_order_pending = (req, res) => {
  var status = "pending"
  axios
    .get(process.env.NODEJS_APP_URL + "/api/orders/status/"+ status)
    .then(function (response) {
      res.render("list_order", { orders: response.data.orders, username: req.session.name });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.list_order_complete = (req, res) => {
  var status = "complete"
  axios
    .get(process.env.NODEJS_APP_URL + "/api/orders/status/"+ status)
    .then(function (response) {
      res.render("list_order", { orders: response.data.orders, username: req.session.name });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.list_order_cancel = (req, res) => {
  var status = "cancel"
  axios
    .get(process.env.NODEJS_APP_URL + "/api/orders/status/"+ status)
    .then(function (response) {
      res.render("list_order", { orders: response.data.orders, username: req.session.name });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.order_detail = (req, res) => {
  var _id = req.query.id;

  axios
    .get(process.env.NODEJS_APP_URL + "/api/orders/" + _id)
    .then(function (response) {
      res.render("list_order_detail", { order: response.data.order, username: req.session.name });
    })
    .catch((err) => {
      res.send(err);
    });
};