const mongoose = require('mongoose');
const faker = require('faker');
const chai = require('chai');
const expect = chai.expect;
const knex = require('knex')({
  client: 'pg',
  connection: {
    host : 'localhost',
    user : 'devinkrok',
    password : '',
    database : 'purchase'
  }
});
const seed = require('./testFunctions.js');
const schema = seed.PetTest;

////NUMBER OF ENTRIES
const numberOfEntries = 1000; 
const CRUDOPERATIONTIMELIMIT = 50; //milliseconds

//////////////MONGO SECTION////////////////

before( ()=>{

  mongoose.connect('mongodb://localhost:27017/purchase', {
        useNewUrlParser: true,
        connectTimeoutMS: 3600000 //1 hour in milliseconds
    });

  const con = mongoose.connection;
  con.on('error', console.error.bind(console, 'connection error:'));
  con.once('open', function() {
    console.log('Connected');
  });
})

describe('MongoDB_Seeding',()=> {
  describe('DB should seed DB quickly',()=> {

    it('should take less than 10 min ',(done)=> {

      seed.seedMongoDB((err,timeElapsed)=>{
        if(err){
          done(err);
        } else {
          expect(timeElapsed).to.be.below(600000, 'TimeElapsed is strictly less than 600,000 milliseconds(10min)');
          expect(timeElapsed).to.be.below(1200000, 'TimeElapsed is strictly less than 1,200,000 milliseconds(20min)');
          expect(timeElapsed).to.be.below(1800000,'TimeElapsed is strictly less than 1,800,000 milliseconds(30min)');
          expect(timeElapsed).to.be.below(3600000, 'TimeElapsed is strictly less than 3,600,000 milliseconds(60min)');
          done();
        }
      },numberOfEntries);
     
    });
  });
  describe('MongoDB should handle entries quickly',(done)=> {

    const pet = seed.createTestEntry();

    it('should store a new item quickly ',(done)=> {
      
      let begin = Date.now();
      pet.save((err)=>{
        if(err){
          done(err);
        } else {
          let end = Date.now();
          let timeElapsed = end-begin;
          expect(timeElapsed).to.be.below(CRUDOPERATIONTIMELIMIT,`TimeElapsed is strictly less than ${CRUDOPERATIONTIMELIMIT}`);
          console.log(`Took ${timeElapsed}ms to store item`);
          done();
        }
      })
    });
  
    it('should find new item quickly ',(done)=> {
      let begin = Date.now();
      seed.PetTest.find({species: '#########'},(err,success)=>{
        if(err){
          done(err);
        } else {
          let end = Date.now();
          let timeElapsed = end-begin;
          expect(timeElapsed).to.be.below(CRUDOPERATIONTIMELIMIT,`TimeElapsed is strictly less than ${CRUDOPERATIONTIMELIMIT}`);
          console.log(`Took ${timeElapsed}ms to store item`);
          done();
        }
      })
    });
    it('should delete a new item quickly ',(done)=> {
      let begin = Date.now();
      seed.PetTest.deleteOne({species: '#########'}, function (err) {
        if (err) {
          done(err);
        } else {
          let end = Date.now();
          let timeElapsed = end-begin;
          expect(timeElapsed).to.be.below(CRUDOPERATIONTIMELIMIT,`TimeElapsed is strictly less than ${CRUDOPERATIONTIMELIMIT}`);
          done();
        }
      });
    });
  });
});

  after( ()=>{
    seed.PetTest.collection.drop();
  });
//////////////POSTGRES SECTION////////////////

describe('PostgresDB_Seeding',()=> {
  describe('should seed PostgresDB quickly',()=> {

    it('should take less than 10 min ',(done)=>{

      seed.seedPostgresDB((err,timeElapsed)=>{
        if(err){
          done(err);
        } else {
          expect(timeElapsed).to.be.below(600000, 'TimeElapsed is strictly less than 600,000 milliseconds(10min)');
          expect(timeElapsed).to.be.below(1200000, 'TimeElapsed is strictly less than 1,200,000 milliseconds(20min)');
          expect(timeElapsed).to.be.below(1800000,'TimeElapsed is strictly less than 1,800,000 milliseconds(30min)');
          expect(timeElapsed).to.be.below(3600000, 'TimeElapsed is strictly less than 3,600,000 milliseconds(60min)');
          done();
        }},numberOfEntries);
    });
  });
  describe('MongoDB should handle entries quickly',(done)=> {

    it('should store a new item quickly ',(done)=> {
      
      let begin = Date.now();
      knex('petsTests').insert({
        "pet_id": 10000001,
        "class": '#########',
        "family": '########',
        "genus": '##########',
        "species": '#########',
        "price": 1000
    }).then( ()=>{
        let end = Date.now();
        let timeElapsed = end-begin;
        expect(timeElapsed).to.be.below(CRUDOPERATIONTIMELIMIT,`TimeElapsed is strictly less than ${CRUDOPERATIONTIMELIMIT}`);
        console.log(`Took ${timeElapsed}ms to store item`);
        done();
      }).catch((err)=>{done(err)});
    });
  
    it('should find new item quickly ',(done)=> {
      let begin = Date.now();
      knex('petsTests').where("species", "#########").then( ()=>{
        let end = Date.now();
        let timeElapsed = end-begin;
        expect(timeElapsed).to.be.below(CRUDOPERATIONTIMELIMIT,`TimeElapsed is strictly less than ${CRUDOPERATIONTIMELIMIT}`);
        console.log(`Took ${timeElapsed}ms to store item`);
        done();
      }).catch((err)=>{done(err)});
    });

    it('should delete a new item quickly ',(done)=> {
      let begin = Date.now();
      knex('petsTests').where("species", "#########").del().then( ()=>{
        let end = Date.now();
        let timeElapsed = end-begin;
        expect(timeElapsed).to.be.below(CRUDOPERATIONTIMELIMIT,`TimeElapsed is strictly less than ${CRUDOPERATIONTIMELIMIT}`);
        console.log(`Took ${timeElapsed}ms to store item`);
        done();
      }).catch((err)=>{done(err)});
    });
  });
});

after( ()=>{
  knex('petsTests').where().del();
});


