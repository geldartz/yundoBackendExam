'use strict';

const generateFakeUser = require('../factories/UserFactory');
const fakeUser = generateFakeUser();
// const faker = require('faker');
// const users = [...Array(10)].map((user) => (
//   {
//     first_name: faker.name.firstName(),
//     last_name: faker.name.lastName(),
//     address: faker.address.streetAddress()+" "+ faker.address.city()+", "+faker.address.country(),
//     post_code: faker.address.zipCode(),
//     contact: faker.phone.phoneNumber(),
//     email: faker.internet.email(),
//     username: faker.internet.userName(),
//     password: faker.internet.password(8),
//   }
// ));

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // return queryInterface.bulkInsert('Users', users, {});
    return queryInterface.insert(null,'Users',fakeUser,{});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
