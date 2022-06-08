const { ingredients, diets } = require('../models');
const db = require('../models');
const Foods = db.foods;
const Op = db.Sequelize.Op;

exports.getFood = (req,res) => {
  const { label } = req.body;

  let condition = label ? { foodName: { [Op.like]: `%${label}%` } } : null;
  Foods.findOne({
    where: condition,
    attributes: ['foodName'],
    include: {
      model: ingredients,
      as: 'ingredients',
      attributes: ['ingredientName'],
      through: {attributes: []},
      include : {
        model: diets,
        as: 'notSuitableFor',
        attributes: ['diet'],
        through: {attributes: []}
      }
    }
  })
  .then((foods) => {
    if (!foods) {
      return res.status(404).json({ message: 'Food Not Found' });
    }
    const result = JSON.parse(JSON.stringify(foods));
    let newIngredients = [];
    let suitableFor = [];
    let vegan = true;
    let vegetarian = true;
    let glutenfree = true;
    let nondiary = true;
    
    result.ingredients.forEach(element => {
      const { ingredientName, notSuitableFor } = element
      const obj = {ingredientName};
      newIngredients.push(obj);

      notSuitableFor.forEach(el => {
        if (el.diet === "Vegan"){
          vegan = false;
        }

        if (el.diet === "Vegetarian"){
          vegetarian = false;
        }

        if (el.diet === "Gluten Free"){
          glutenfree = false;
        }

        if (el.diet === "Non Diary"){
          nondiary = false;
        }
        
      });

    });

    if (vegan == true) {
      suitableFor.push({ "diet" : "vegan" })
    }

    if (vegetarian == true) {
      suitableFor.push({ "diet" : "vegetarian" })
    }

    if (glutenfree == true) {
      suitableFor.push({ "diet" : "Gluten Free" })
    }

    if (nondiary == true) {
      suitableFor.push({ "diet" : "Non Diary" })
    }
    
    result.ingredients.length = 0;
    result.ingredients = newIngredients;
    result.suitableFor = suitableFor;

    return res.status(200).json({
      status: 'success',
      requestAt: Date.now(),
      result
    });
  })
  .catch((error) => {
    res.status(400).json(error)
  });

};