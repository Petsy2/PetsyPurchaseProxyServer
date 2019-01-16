const mongoose = require('mongoose');
const faker = require('faker');
const knex = require('knex')({
    client: 'pg',
    connection: {
      host : 'localhost',
      user : 'devinkrok',
      password : '',
      database : 'purchase'
    }
  });

const Schema = mongoose.Schema;

const petSchema = new Schema({
      pet_id: { type: Number },
      class: { type: String },
      family: { type: String },
      genus: { type: String },
      species: { type: String },
      price: {type: Number},
});

const PetTest = mongoose.model('PetTest', petSchema);

function seedMongoDB(cb,numberOfEntries){

    let arr = [];
    for( let i = 0; i < numberOfEntries; i++){

        const pet = new PetTest({
            pet_id: i,
            class: faker.address.country(),
            family: faker.address.state(),
            genus: faker.address.city(),
            species: faker.address.zipCode(),
            price: faker.random.number(),
        })

        arr.push(pet);
    }

    let begin = Date.now();
    PetTest.insertMany(arr, function(error, docs) {
        if(error){
            cb(error);
        }
        let end = Date.now();
        const timeElapsed = end-begin;
        console.log(numberOfEntries+' entries', 'Time taken: ' + timeElapsed);
        cb(null,timeElapsed);
    });
  }

  function seedPostgresDB(cb,numberOfEntries){
    let arr = [];
    for( let i = 0; i <= numberOfEntries; i++){

        const pet = {
            pet_id: i,
            class: faker.address.country(),
            family: faker.address.state(),
            genus: faker.address.city(),
            species: faker.internet.userName(),
            price: faker.random.number(),
        }

        arr.push(pet);
    }
    let begin = Date.now();
    knex.batchInsert('petsTests', arr).then( ()=>{
      let end = Date.now();
      let timeElapsed = end-begin;
      console.log(numberOfEntries+' entries', 'Time taken: ' + timeElapsed);
      cb(null,timeElapsed);
    }).catch( (err)=>{
      cb(err);
    })
  }

  function createTestEntry(){

    const pet = new PetTest({
        "pet_id": 10000001,
        "class": '#########',
        "family": '########',
        "genus": '##########',
        "species": '#########',
        "price": 1000
    });
    return pet;
  }

  module.exports = {
      PetTest,
      createTestEntry,
      seedMongoDB,
      seedPostgresDB
    };