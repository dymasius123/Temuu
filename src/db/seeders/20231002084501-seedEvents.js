'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = require("../data/event.json").map((el) => {
      el.is_verified = false
      el.is_public = true
      el.slug = el.title.split(' ').join('-')
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
     })
    await queryInterface.bulkInsert('Events', data, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Events', null, {})
  }
};