const express = require('express');
const passport = require("passport");
const router = express.Router();
const foodsController = require("../controllers/foods.controller");

router.get('/', passport.authenticate("jwt", { session: false }), foodsController.getFood);

module.exports = router;