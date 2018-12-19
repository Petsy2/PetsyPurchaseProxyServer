const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const colors = require('colors');
const db = require('./database');
const app = express();

// use
app.use(bodyParser.json());

// import getPetByID
db.getPetByID('03');