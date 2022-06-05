'use strict';
module.exports = (sequelize, DataTypes) => {
  const IngredientsDiets = sequelize.define('IngredientsDiets', {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    ingredientId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dietId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    createdAt: false,
    updatedAt: false
  });

  return IngredientsDiets;
};