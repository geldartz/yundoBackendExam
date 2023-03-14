const faker = require('faker');
const bcrypt = require("bcrypt");

const salt = bcrypt.genSaltSync();
const hash = bcrypt.hashSync("password", salt);

function generateFakeUser() {
  return {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    address: faker.address.streetAddress()+" "+ faker.address.city()+", "+faker.address.country(),
    post_code: faker.address.zipCode(),
    contact: faker.phone.phoneNumber(),
    email: faker.internet.email(),
    username: faker.internet.userName(),
    password: hash,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

module.exports = generateFakeUser;