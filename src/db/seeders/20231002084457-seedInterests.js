'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = require("../data/interest.json").map((el) => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
     })
    await queryInterface.bulkInsert('Interests', data, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Interests', null, {})
  }
};