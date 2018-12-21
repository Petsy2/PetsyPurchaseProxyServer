const mongodb = require('mongodb');
const key = require('../key');
const url = `mongodb+srv://austinAdmin:${key.key}@austintestcluster-mdigu.mongodb.net/test?retryWrites=true`
const client = new mongodb.MongoClient(url, {useNewUrlParser:true});


// Get Pet By ID
const getPetByID = (id, callback = () => {console.log('no callback')}) => {
  client.connect(err => {
    // if err connecting
    if (err) {
      console.log('ERR |get pet by id|', err);
      callback(err);
    } 
    // if no err connecting
    else {
      const collection = client.db('purchase').collection('pets');
      collection.find({pet_id: id}).toArray()
      .then(data => {
        callback(null, data[0]);
      })
      .catch(err => callback(err));
    }
  });
};


// add one pet to DB
const addOneToDB = (object, callback = _=> {console.log('no callback')}) => {
  client.connect(err => {
    // if err connecting
    if (err) {
      console.log('ERR |add one pet to DB|', err);
      callback(err);
    } 
    // if no err connecting
    else {
      const collection = client.db('purchase').collection('pets');
      collection.insertOne(object)
      .then(callback(null, 'success'))
      .catch(err => callback(err))
    }
    client.close();
  });
};


// add array of pets to DB
const addManyToDB = (array, callback = _=> {console.log('no callback')}) => {
  client.connect(err => {
    if (err) {
      console.log('ERROR add one to DB');
      callback(err);
    } else {
      const collection = client.db('purchase').collection('pets');
      collection.insertMany(array)
      .then(res => callback(null,res))
      .catch(err => callback(err))
    }
    client.close();
  });
};


const deleteOneFromDB = (object, callback = _=> {console.log('no callback')}) => {
  client.connect(err => {
    if(err) {
      console.log('ERROR remove one from DB');
      callback(err);
    } else {
      const collection = client.db('purchase').collection('pets');
      collection.deleteOne({pet_id:object})
      .then(res => {
        console.log("removed with no err")
        callback(null,res);
      })
      .catch(err => console.log(err))
    }
    client.close();
  })
};


module.exports = {
  getPetByID,
  addOneToDB,
  addManyToDB,
  deleteOneFromDB
}
