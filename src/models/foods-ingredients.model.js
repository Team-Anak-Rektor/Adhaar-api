'use strict';
module.exports = (sequelize, DataTypes) => {
  const FoodsIngredients = sequelize.define('Foods-Ingredients', {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    foodId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ingredientId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    createdAt: false,
    updatedAt: false
  });

  return FoodsIngredients;
};