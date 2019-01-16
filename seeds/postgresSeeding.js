const faker = require('faker');


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('pets').del()
    .then(function () {

      let arr = [];
      let numberOfEntries = 10000000;
      for( let i = 0; i <= numberOfEntries; i++){
        const pet = {
          pet_id: i,
          class: faker.address.country(),
          family: faker.address.state(),
          genus: faker.address.city(),
          species: faker.internet.userName(),
          price: faker.random.number()
        }
      arr.push(pet);
      }
      // Inserts seed entries
      return knex.batchInsert('pets',arr);
    });
};

