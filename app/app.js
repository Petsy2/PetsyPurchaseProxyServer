const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');
const app = express();
const data = require('../data');

// use
app.use(bodyParser.json());

app.get('/buy', (req, res) => {
  const id = req.body.pet_id;
  console.log('\n -> Get Request on "/buy"\n -> pet_id: ', id);
  db.getPetByID(id, (err, data) => {
    if(err) {}
    else {
      res.status(200).send(data);
    }
  })
})

app.listen(4000, _=> {console.log('Roger Roger / port 4000')});
