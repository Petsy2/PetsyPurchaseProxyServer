const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');
const mongo = require('mongodb');
const cors = require('cors');
const app = express();

// use
app.use(bodyParser.json());
app.use(cors());

app.get('/buy/:id', (req, res) => {
  // const id = req.headers.pet_id
  const id = req.params.id;
  console.log('\n -> Get Request on "/buy"\n -> pet_id: ', id);
  db.getPetByID(id, (err, data) => {
    // if err || data object is empty
    if(err || !data) {
      res.status(404).send();
    }
    else {
      res.status(200).send(data);
    }
  })
})

app.get('/eric/:id', (req, res) => { // do this with pet_id <-- !¡!
  console.log(req.params.id);
  res.send(req.params.id)
})

app.listen(process.env.PORT || "4002", _=> {console.log('Roger Roger / port 4002')});
