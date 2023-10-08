'use strict';

const { hashPassword } = require("../../helpers/bcrypt.js");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = require("../data/user.json").map((el) => {
      el.password = hashPassword(el.password)
      el.is_verified = false
      el.is_blocked = false
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
     })
    await queryInterface.bulkInsert('Users', data, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  }
};