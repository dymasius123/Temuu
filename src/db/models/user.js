'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require("../../helpers/bcrypt.js");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.History, { foreignKey: `user_id` });

    }
  }
  User.init({
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Please enter first_name" },
        notEmpty: { msg: "Please enter first_name" }
      },
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Please enter last_name" },
        notEmpty: { msg: "Please enter last_name" }
      },
    },
    role: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: "username already taken" },
      validate: {
        notNull: { msg: "Please enter username" },
        notEmpty: { msg: "Please enter username" },
      },
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Please enter phone_number" },
        notEmpty: { msg: "Please enter phone_number" }
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Please enter password" },
        notEmpty: { msg: "Please enter password" },
        len: { args: [5], msg: "Password must more than 5 character" },
      },
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Please select gender" },
        notEmpty: { msg: "Please select gender" }
      },
    },
    is_verified: DataTypes.BOOLEAN,
    is_blocked: DataTypes.BOOLEAN,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((el) => {
    el.password = hashPassword(el.password);
    el.is_verified = false
    el.is_blocked = false
  });
  return User;
};