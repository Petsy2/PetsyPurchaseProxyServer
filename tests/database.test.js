const db = require('../app/database'); // import database functions


// pet object for testing database
const pet = {
  "pet_id":"9999",
  "class":"mammal",
  "family":"important",
  "genus":"gross",
  "species":"human",
  "price":"infinity"
};


beforeEach(() => {
  // add pet object to database before each test
  db.addOneToDB(pet); 
});


afterEach(() => {
  // delete pet object from database after each test
  db.deleteOneFromDB(pet.pet_id);
});


test('can get pet object from database', done => {
  // get pet object from database
  db.getPetByID(pet.pet_id, (err, data) => {
    expect(data.species).toEqual('human');
    expect(data.price).toEqual('infinity');
    expect(data.genus).toEqual('gross');
    expect(data.family).toEqual('important');
    expect(data.class).toEqual('mammal');
  });
  done();
});
