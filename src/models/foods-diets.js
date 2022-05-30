'use strict';
module.exports = (sequelize, DataTypes) => {
  const FoodsDiets = sequelize.define('FoodsDiets', {
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
    dietId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    createdAt: false,
    updatedAt: false
  });

  return FoodsDiets;
};