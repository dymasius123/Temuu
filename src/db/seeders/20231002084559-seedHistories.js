"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let data = require("../data/history.json").map((el) => {
      el.timestamp = new Date();
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    });
    await queryInterface.bulkInsert("Histories", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Histories", null, {});
  },
};
