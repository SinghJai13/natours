/* eslint-disable no-console */
const fs=require('fs');
const Tour=require('./../../ models/tourModel');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/../../config.env` });
//dotenv.config({ path: './config.env' });
//const app = require('./app');

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log('DB connections successful.....');
  });

const tours=JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`,'utf-8'));
//import data in DB
const importData=async()=>{
    try{
        await Tour.create(tours);
        process.exit();
    }catch(err){
        console.log(err);
    }
}

//DELETE ALL DATA FROM DB
const deleteData=async()=>{
    try{
        await Tour.deleteMany();
        console.log("Succesfully deleted");
        process.exit();
    }catch(err){
        console.log(err);
    }
}
if(process.argv[2]==='--import')
{
    importData();
}
else if(process.argv[2]==='--delete')
{
    deleteData();
}
console.log(process.argv);