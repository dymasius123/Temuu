'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.hasMany(models.History, { foreignKey: `event_id` });
      Event.belongsTo(models.Interest, { foreignKey: `interest` })
    }
  }
  Event.init({
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
    slug: DataTypes.STRING,
    sector: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Please enter sector" },
        notEmpty: { msg: "Please enter sector" }
      },
    },
    interest: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Please select interest" },
        notEmpty: { msg: "Please select interest" }
      },
    },
    purpose: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Please enter purpose" },
        notEmpty: { msg: "Please enter purpose" }
      },
    },
    gender_type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Please enter gender_type" },
        notEmpty: { msg: "Please enter gender_type" }
      },
    },
    is_business: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: { msg: "Please select business type" },
        notEmpty: { msg: "Please select business type" }
      },
    },
    long: DataTypes.STRING,
    lat: DataTypes.STRING,
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Please enter location" },
        notEmpty: { msg: "Please enter location" }
      },
    },
    fee: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Please enter fee" },
        notEmpty: { msg: "Please enter fee" }
      },
    },
    is_verified: DataTypes.BOOLEAN,
    is_public: DataTypes.BOOLEAN,
    phase: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Please enter phase" },
        notEmpty: { msg: "Please enter phase" }
      },
    }
  }, {
    sequelize,
    modelName: 'Event',
  });
  Event.beforeCreate((el) => {
    // el.is_verified = false
    // el.is_public = true
    el.slug = el.title.split(' ').join('-')
  });
  return Event;
};