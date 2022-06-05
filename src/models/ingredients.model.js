'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ingredients = sequelize.define('ingredients', {
    ingredientId: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    ingredientName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    createdAt: false,
    updatedAt: false
  });

  Ingredients.associate = (models) => {
    Ingredients.belongsToMany(models.foods, {
      through: "FoodsIngredients",
      foreignKey: 'ingredientId',
      as: 'foods'
    });

    Ingredients.belongsToMany(models.diets, {
      through: "IngredientsDiets",
      foreignKey: 'ingredientId',
      as: 'notSuitableFor'
    });
  };

  return Ingredients;
};