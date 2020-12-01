var express = require('express');
var router = express.Router();
const mysql = require('mysql')
const app = require('../app');
require('dotenv').config();
const axios = require('axios');

const db = mysql.createConnection({
  host: 'database-1.cmumwzkt7ui9.us-west-1.rds.amazonaws.com', 
  user: 'admin', 
  password: 'password',
  port: 3306,
  database: 'nodemysql'
})

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySql Connected...');
});

router.get('/createTable', (req, res) => {
  let sql = 'CREATE TABLE ModelData(id VARCHAR(255), model VARCHAR(65535), PRIMARY KEY(id))';
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('table created...')
  });
});

router.get('/getRow/:id', (req, res) => {
  let sql = `SELECT * FROM test WHERE symbol = '${req.params.id}'`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(`Sending row ${req.params.id} from database`);
    res.json(result);
  });
});

router.get('/getAllRows', (req, res) => {
  let sql = `SELECT * FROM test`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("Sending all rows from database");
    res.json(result);
  });
});

router.get('/getPrediction/:id', (req, res) => {
  let sql = `SELECT * FROM output WHERE symbol = '${req.params.id}'`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(`Sending prediction for ${req.params.id} from database`);
    res.json(result);
  });
})

router.get('/getTimeSeries/:symbol', (req, res) => {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&outputsize=full&symbol=${req.params.symbol}&apikey=R1TE9XCC432MADLL`;
  axios.get(url).then(response => {
    res.json(response.data);
  })
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
