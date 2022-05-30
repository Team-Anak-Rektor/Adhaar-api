const express = require('express');
const router = express.Router();
const foodsController = require("../controllers/foods");

router.get('/', foodsController.getFoods);

module.exports = router;