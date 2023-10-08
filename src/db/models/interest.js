'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Interest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Interest.hasMany(models.Event, { foreignKey: `interest` });
    }
  }
  Interest.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Please enter title" },
        notEmpty: { msg: "Please enter title" }
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Please enter description" },
        notEmpty: { msg: "Please enter description" }
      },
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Please enter color" },
        notEmpty: { msg: "Please enter color" }
      },
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Please enter icon" },
        notEmpty: { msg: "Please enter icon" }
      },
    },
  }, {
    sequelize,
    modelName: 'Interest',
  });
  return Interest;
};