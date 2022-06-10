const { diets } = require('../models');
const db = require('../models');
const Ingredients = db.ingredients;
const Op = db.Sequelize.Op;

exports.getIngredients = (req,res) => {
  const { label } = req.body;
//   const newName = name.replace('"', '');
//   const newName2 = newName.replace('"', '');
  const arrLabel = label.split(", ");

  let condition = arrLabel ? { ingredientName: { [Op.or]: arrLabel } } : null;
  Ingredients.findAll({
    where: condition,
    attributes: ['ingredientName'],
    include: {
        model: diets,
        as: 'notSuitableFor',
        attributes: ['diet'],
        through: {attributes: []}
    }
  })
  .then((ingredients) => {
    if (!ingredients) {
      return res.status(404).json({ message: 'Food Not Found' });
    }
    
    const result = {};
    let newIngredients = [];
    let suitableFor = [];
    let vegan = true;
    let vegetarian = true;
    let glutenfree = true;
    let nondiary = true;
    
    ingredients.forEach(element => {
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
    
    ingredients.length = 0;
    ingredients = newIngredients;
    result.ingredients = ingredients
    result.suitableFor = suitableFor;

    return res.status(200).json({
      status: 'success',
      requestAt: new Date().toISOString(),
      result
    });
  })
  .catch((error) => {
    res.status(400).json(error)
  });

};