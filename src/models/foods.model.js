'use strict';
module.exports = function(sequelize, DataTypes) {
  const Foods = sequelize.define('foods', {
    foodId: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    foodName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    createdAt: false,
    updatedAt: false
  });

  Foods.associate = (models) => {
    Foods.belongsToMany(models.ingredients, {
      through: "FoodsIngredients",
      foreignKey: 'foodId',
      as: 'ingredients'
    });
  };

  return Foods;
};