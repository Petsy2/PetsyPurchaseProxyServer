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
    let begin = Date.now();
    knex.batchInsert('pets', arr).then( ()=>{
      let end = Date.now();
      let timeElapsed = end-begin;
      console.log(numberOfEntries+' entries', 'Time taken: ' + timeElapsed);
    }
    )
    
