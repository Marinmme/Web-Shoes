const express = require("express");
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const SlidersController = require('../controllers/sliders');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.get("/", SlidersController.sliders_get_all);

router.post("/", upload.single('sliderImage'), SlidersController.sliders_create_slider);

router.get("/:sliderId", SlidersController.sliders_get_slider);

router.post("/updateSlider", upload.single('sliderImage'), SlidersController.sliders_update_slider);

router.delete("/:sliderId", SlidersController.sliders_delete);

module.exports = router;