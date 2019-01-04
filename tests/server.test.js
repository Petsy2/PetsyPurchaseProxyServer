const Axios  = require('axios');
const db = require('../app/database');

const pet = {
  "pet_id":"9991",
  "class":"mammal",
  "family":"who needs them...",
  "genus":"stephen hawking",
  "species":"pikachu",
  "price":"17.50"
};

beforeEach(() => {
  // add pet object to database before each test
  db.addOneToDB(pet);
})

afterEach(() => {
  // delete pet object from database after each test
  db.deleteOneFromDB(pet.pet_id);
});

test('can get a pet object from server', done => {
  Axios.get('http://localhost:4000/buy', {
    pet_id:"9991"
  }).then(res => {
    expect(res.data.species).toEqual("pikachu")
  })
  done();
})
