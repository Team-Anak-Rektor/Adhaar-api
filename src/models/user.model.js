'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
  });

  return User;
};