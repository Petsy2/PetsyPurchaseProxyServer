const mongodb = require('mongodb');
const key = require('../key.js');

const url = `mongodb+srv://austinAdmin:${key.key}@austintestcluster-mdigu.mongodb.net/test?retryWrites=true`
const client = new mongodb.MongoClient(url, {useNewUrlParser:true});

const getPetByID = (id, callback) => {
  client.connect(err => {
    const collection = client.db('purchase').collection('pets');
    collection.find().toArray().then(data => console.log(data[0].all[id]));
    client.close();
  });
}

module.exports = {
  getPetByID
}