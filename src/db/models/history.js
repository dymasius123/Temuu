'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      History.belongsTo(models.User, { foreignKey: `user_id` })
      History.belongsTo(models.Event, { foreignKey: `event_id` })
    }
  }
  History.init({
    timestamp: DataTypes.DATE,
    user_id: DataTypes.INTEGER,
    event_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'History',
  });
  History.beforeCreate((el) => {
    el.timestamp = new Date()
  });
  return History;
};