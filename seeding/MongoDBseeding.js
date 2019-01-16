let pets = require('../data.js');
let db = require('../app/database.js');
const mongoose = require('mongoose');
const faker = require('faker');

    mongoose.connect('mongodb://localhost:27017/purchase', {
        useNewUrlParser: true,
        connectTimeoutMS: 3600000 //1 hour in milliseconds
    });

    const con = mongoose.connection;
    con.on('error', console.error.bind(console, 'connection error:'));
    con.once('open', function() {
    console.log('Connected');
    });


    const Schema = mongoose.Schema;

    const petSchema = new Schema({
        pet_id: { type: Number },
        class: { type: String },
        family: { type: String },
        genus: { type: String },
        species: { type: String },
        price: {type: Number}
    });

    const Pet = mongoose.model('Pet', petSchema);

    let arr = [];
    let numberOfEntries = 1000000;
    for( let i = 0; i < numberOfEntries; i++){

        const pet = new Pet({
            pet_id: i,
            class: faker.address.country(),
            family: faker.address.state(),
            genus: faker.address.city(),
            species: faker.internet.userName(),
            price: faker.random.number()
        })

        arr.push(pet);
    }

   
    let begin = Date.now();
    Pet.insertMany(arr, function(error, docs) {
        if(error){
            console.log(error);
        }
        let end = Date.now();
        let timeElapsed = end-begin;
        console.log(numberOfEntries+' entries', 'Time taken: ' + timeElapsed);
        // Pet.collection.drop();
        // console.log('Collection dropped');
    });

//Initial Seeding of DB
// db.addManyToDB(pets,function(err,success){
//     if(err){
//         console.log(err);
//     } else {
//         console.log('Results:',success);
//     }
// });

