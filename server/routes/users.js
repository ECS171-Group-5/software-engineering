var express = require('express');
var router = express.Router();
const mysql = require('mysql')
const cookieParser = require('cookie-parser');
const app = require('../app');
const uuid = require('uuid');
require('dotenv').config();
const cfg = require('../../ModelBuilder/config/config.json');
const Stocks = require('../../ModelBuilder/DataScraper/DataScraper.js');
const {spawn} = require('child_process');
const axios = require('axios');

router.use(cookieParser())

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

// unecessary if database is specified in createConnection funciton
// router.get('/createdb', (req, res) => {
//   let sql = 'CREATE DATABASE nodemysql';
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send('Database created');
//   });
// });

router.get('/addDummyRow', (req, res) => {
  let sql = `INSERT INTO ModelData Values (?, ?)`;

  db.query(sql, ['234-asf-f4-f2-1', 'test'], (err, result) => {
    if(err) {
      console.log('not good');
      throw err;
    }
    console.log(result);

    res.send('added dummy row')
  });
});

const cookie = 'cookie';

router.get('/createTable', (req, res) => {
  let sql = 'CREATE TABLE ModelData(id VARCHAR(255), model VARCHAR(65535), PRIMARY KEY(id))';
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('table created...')
  });
});

// for debugging
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

router.get('/getTimeSeries/:symbol', (req, res) => {
  // let sql = `SELECT * FROM test`;
  // let query = db.query(sql, (err, result) => {
  //   if (err) throw err;
  //   console.log("Sending all rows from database");
  //   res.json(result);
  // });

  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&outputsize=full&symbol=${req.params.symbol}&apikey=R1TE9XCC432MADLL`;
  axios.get(url).then(response => {
    res.json(response.data);
  })
});

function setLimit(req, res) {
  let sql = 'SELECT model FROM ModelData WHERE id = ?';

  // need to handle if there is no row with id
  db.query(sql, req.cookies[cookie], (err, result, fields) => {
    if (err) throw err;

    let model = fields[0].model;
    model = JSON.parse(model);
    model = new Stocks.DataScraper(model.stocks, model.params, modle.period, model.limit);

    model.setLimit(req.body.limit);
    model = JSON.stringify(model)

    let sql = 'UPDATE ModelData SET moodel = ? WHERE id = ?';
    db.query(sql, model, req.cookies[cookie], (err, result) => {
      if(err) throw err;
      console.log(result);
      res.send('Set Limit')
    });
  })
}

router.post('/setLimit', (req, res) => {
  if (req.cookies[cookie]==undefined) {
    var id = uuid.v4();
    res.cookie(cookie, id, { expires: new Date(Date.now() + 3600000), httpOnly: true });

    let model = new Stocks.DataScraper();
    model = JSON.stringify(model);

    let sql = 'INSERT INTO ModelData Values (?, ?)';

    db.query(sql, id, model, (err, result) => {
      if(err) throw err;
      console.log(result);

      setLimit(req, res);
    });
  } else {
    setLimit(req, res);
  }
});

function setPeriod(req, res) {
  let sql = 'SELECT model FROM ModelData WHERE id = ?';

  // need to handle if there is no row with id
  db.query(sql, req.cookies[cookie], (err, result, fields) => {
    if (err) throw err;

    let model = fields[0].model;
    model = JSON.parse(model);
    model = new Stocks.DataScraper(model.stocks, model.params, modle.period, model.limit);

    model.setPeriod(req.body.period);
    model = JSON.stringify(model)

    let sql = 'UPDATE ModelData SET moodel = ? WHERE id = ?';
    db.query(sql, model, req.cookies[cookie], (err, result) => {
      if(err) throw err;
      console.log(result);
      res.send('Set Period')
    });
  })
}

router.post('/setPeriod', (req, res) => {
  if (req.cookies[cookie]==undefined) {
    var id = uuid.v4();
    res.cookie(cookie, id, { expires: new Date(Date.now() + 3600000), httpOnly: true });

    let model = new Stocks.DataScraper();
    model = JSON.stringify(model);

    let sql = 'INSERT INTO ModelData Values (?, ?)';

    db.query(sql, id, model, (err, result) => {
      if(err) throw err;
      console.log(result);

      setPeriod(req, res);
    });
  } else {
    setPeriod(req, res);
  }
});

function addParams(req, res) {
  let sql = 'SELECT model FROM ModelData WHERE id = ?';

  // need to handle if there is no row with id
  db.query(sql, req.cookies[cookie], (err, result, fields) => {
    if (err) throw err;

    let model = fields[0].model;
    model = JSON.parse(model);
    model = new Stocks.DataScraper(model.stocks, model.params, modle.period, model.limit);

    model.addParams(req.body.params);
    model = JSON.stringify(model)

    let sql = 'UPDATE ModelData SET moodel = ? WHERE id = ?';
    db.query(sql, model, req.cookies[cookie], (err, result) => {
      if(err) throw err;
      console.log(result);
      res.send('Added params')
    });
  })
}

router.post('/addParams', (req, res) => {
  if (req.cookies[cookie]==undefined) {
    var id = uuid.v4();
    res.cookie(cookie, id, { expires: new Date(Date.now() + 3600000), httpOnly: true });

    let model = new Stocks.DataScraper();
    model = JSON.stringify(model);

    let sql = 'INSERT INTO ModelData Values (?, ?)';

    db.query(sql, id, model, (err, result) => {
      if(err) throw err;
      console.log(result);

      addParams(req, res);
    });
  } else {
    addParams(req, res);
  }
});

function removeParams(req, res) {
  let sql = 'SELECT model FROM ModelData WHERE id = ?';

  // need to handle if there is no row with id
  db.query(sql, req.cookies[cookie], (err, result, fields) => {
    if (err) throw err;

    let model = fields[0].model;
    model = JSON.parse(model);
    model = new Stocks.DataScraper(model.stocks, model.params, modle.period, model.limit);

    model.removeParams(req.body.params);
    model = JSON.stringify(model)

    let sql = 'UPDATE ModelData SET moodel = ? WHERE id = ?';
    db.query(sql, model, req.cookies[cookie], (err, result) => {
      if(err) throw err;
      console.log(result);
      res.send('Removed params')
    });
  })
}

router.post('/removeParams', (req, res) => {
  if (req.cookies[cookie]==undefined) {
    var id = uuid.v4();
    res.cookie(cookie, id, { expires: new Date(Date.now() + 3600000), httpOnly: true });

    let model = new Stocks.DataScraper();
    model = JSON.stringify(model);

    let sql = 'INSERT INTO ModelData Values (?, ?)';

    db.query(sql, id, model, (err, result) => {
      if(err) throw err;
      console.log(result);

      removeParams(req, res);
    });
  } else {
    removeParams(req, res);
  }
});

function addStocks(req, res) {
  let sql = 'SELECT model FROM ModelData WHERE id = ?';

  // need to handle if there is no row with id
  db.query(sql, req.cookies[cookie], (err, result, fields) => {
    if (err) throw err;

    let model = fields[0].model;
    model = JSON.parse(model);
    model = new Stocks.DataScraper(model.stocks, model.params, modle.period, model.limit);

    model.addStocks(req.body.stocks);
    model = JSON.stringify(model)

    let sql = 'UPDATE ModelData SET moodel = ? WHERE id = ?';
    db.query(sql, model, req.cookies[cookie], (err, result) => {
      if(err) throw err;
      console.log(result);
      res.send('Added stocks')
    });
  })
}

router.post('/addStocks', (req, res) => {
  if (req.cookies[cookie]==undefined) {
    var id = uuid.v4();
    res.cookie(cookie, id, { expires: new Date(Date.now() + 3600000), httpOnly: true });

    let model = new Stocks.DataScraper();
    model = JSON.stringify(model);

    let sql = 'INSERT INTO ModelData Values (?, ?)';

    db.query(sql, id, model, (err, result) => {
      if(err) throw err;
      console.log(result);

      addStocks(req, res);
    });
  } else {
    addStocks(req, res);
  }
});

function removeStocks(req, res) {
  let sql = 'SELECT model FROM ModelData WHERE id = ?';

  // need to handle if there is no row with id
  db.query(sql, req.cookies[cookie], (err, result, fields) => {
    if (err) throw err;

    let model = fields[0].model;
    model = JSON.parse(model);
    model = new Stocks.DataScraper(model.stocks, model.params, modle.period, model.limit);

    model.removeStocks(req.body.stocks);
    model = JSON.stringify(model)

    let sql = 'UPDATE ModelData SET moodel = ? WHERE id = ?';
    db.query(sql, model, req.cookies[cookie], (err, result) => {
      if(err) throw err;
      console.log(result);
      res.send('Removed stocks')
    });
  })
}

router.post('/removeStocks', (req, res) => {
  if (req.cookies[cookie]==undefined) {
    var id = uuid.v4();
    res.cookie(cookie, id, { expires: new Date(Date.now() + 3600000), httpOnly: true });

    let model = new Stocks.DataScraper();
    model = JSON.stringify(model);

    let sql = 'INSERT INTO ModelData Values (?, ?)';

    db.query(sql, id, model, (err, result) => {
      if(err) throw err;
      console.log(result);

      removeStocks(req, res);
    });
  } else {
    removeStocks(req, res);
  }
});

function runPython(req, res) { 
  var pydata;
  
  // spawns new process
  const py = spawn('python', ['pytest.py']);

  // collect stdout
  python.stdout.on('data', function(data) {
    // console.log('Piping data from python script ...');
    pydata = data.toString();
  });

  // make sure child process is closed
  py.on('close', (code) => {
    console.log('child process closed with code ${code}');
  })
}

function generateModel(req, res) {
  let sql = 'SELECT model FROM ModelData WHERE id = ?';

  // need to handle if there is no row with id
  db.query(sql, req.cookies[cookie], (err, result, fields) => {
    if (err) throw err;

    let model = fields[0].model;
    model = JSON.parse(model);
    model = new Stocks.DataScraper(model.stocks, model.params, modle.period, model.limit);

    model.generateModel().then((m) => {
      model = JSON.stringify(model)

      let sql = 'UPDATE ModelData SET moodel = ? WHERE id = ?';
      db.query(sql, model, req.cookies[cookie], (err, result) => {
        if(err) throw err;
        console.log(result);
        res.json(m)
      });
   });
  })
}

router.get('/generateModel', (req, res) => {
  if (req.cookies[cookie]==undefined) {
    var id = uuid.v4();
    res.cookie(cookie, id, { expires: new Date(Date.now() + 3600000), httpOnly: true });

    let model = new Stocks.DataScraper();
    model = JSON.stringify(model);

    let sql = 'INSERT INTO ModelData Values (?, ?)';

    db.query(sql, id, model, (err, result) => {
      if(err) throw err;
      console.log(result);

      generateModel(req, res);
    });
  } else {
    generateModel(req, res);
  }
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
