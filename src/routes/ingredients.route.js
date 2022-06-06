const express = require('express');
const passport = require("passport");
const router = express.Router();
const ingredientsController = require("../controllers/ingredients.controller");

router.get('/', passport.authenticate("jwt", { session: false }), ingredientsController.getIngredients);

module.exports = router;