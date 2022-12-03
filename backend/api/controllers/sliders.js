const mongoose = require("mongoose");
const Slider = require("../models/slider");

exports.sliders_get_all = (req, res, next) => {
  Slider.find()
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        sliders: docs.map((doc) => {
          return {
            title: doc.title,
            description: doc.description,
            background: doc.background,
            sliderImage: doc.sliderImage,
            _id: doc._id,
            request: {
              type: "GET",
              url: process.env.NODEJS_APP_URL + "/api/sliders/" + doc._id,
            },
          };
        }),
      };

      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.sliders_create_slider = (req, res, next) => {
  const slider = new Slider({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    description: req.body.description,
    background: req.body.background,
    sliderImage: req.file.path,
  });
  slider
    .save()
    .then((result) => {
      res.redirect("../list-slider");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.sliders_get_slider = (req, res, next) => {
  const id = req.params.sliderId;
  Slider.findById(id)
    .exec()
    .then((doc) => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          slider: doc,
          request: {
            type: "GET",
            url: process.env.NODEJS_APP_URL + "/api/sliders",
          },
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.sliders_update_slider = (req, res, next) => {
  var dataRecords = {
    title: req.body.title,
    description: req.body.description,
    background: req.body.background,
  };

  if (req.file) {
    dataRecords.sliderImage = req.file.path;
  }
  Slider.findByIdAndUpdate(req.body.sliderId, dataRecords)
    .exec()
    .then((result) => {
      res.redirect("../../list-slider");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.sliders_delete = (req, res, next) => {
  const id = req.params.sliderId;

  Slider.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "slider deleted",
        request: {
          type: "POST",
          url: process.env.NODEJS_APP_URL + "/api/sliders",
          body: { name: "String" },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
