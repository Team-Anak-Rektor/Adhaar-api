'use strict';
module.exports = (sequelize, DataTypes) => {
  const Diets = sequelize.define('diets', {
    dietId: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    diet: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    createdAt: false,
    updatedAt: false
  });

  Diets.associate = (models) => {
    Diets.belongsToMany(models.ingredients, {
      through: "IngredientsDiets",
      foreignKey: 'dietId',
      as: 'allergy'
    });
  };

  return Diets;
};