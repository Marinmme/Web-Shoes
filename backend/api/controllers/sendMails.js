const mongoose = require("mongoose");


exports.sendMail = (req, res, next) => {
  console.log(req.body)
  const output = `
  <p>Order success</p>
  `
};
