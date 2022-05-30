const { foods, ingredients, diets } = require('../models/');
const db = require('../models/');
const Foods = db.foods;
const Op = db.Sequelize.Op;

exports.getFoods = (req,res) => {
  console.log("hello");

  const name = req.body.name;
  let condition = name ? { foodName: { [Op.like]: `%${name}%` } } : null;
  Foods.findAll({
    where: condition,
    attributes: ['foodName'],
    include: [
      {
        model: ingredients,
        as: 'ingredients',
        attributes: ['ingredientName'],
        through: {attributes: []}
      },
      {
        model: diets,
        as: 'suitableFor',
        attributes: ['diet'],
        through: {attributes: []}
      }
    ]
  })
  .then((foods) => {
    if (!foods) {
      return res.status(404).json({ message: 'Recipe Not Found' });
    }

    return res.status(200).json(foods);
  })
  .catch((error) => {
    res.status(400).json(error)
  });
};