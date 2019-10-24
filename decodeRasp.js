
const mysql = require('mysql');
const request = require('request');

const dbCon = {
    host: "database-1.cgh4kgpy7rzv.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "dinosaurio.99",
    database: "DesignDB"
};


exports.insert = (req, res) => {
    const stateKeys = Object.keys(req.body.Estados); 
    const stateValues = Object.values(req.body.Estados);
    const con = mysql.createConnection(dbCon);
    con.connect();
    const sql = `INSERT INTO ${req.body.Tablero}(${stateKeys},time) VALUES(${stateValues},${req.body.Fecha})`;
    con.query(sql,function(err, result) {
        if (err) throw err;
        console.log("record inserted");
    });
    con.end();
    res.send('done');
};

exports.get = (req, res) => {
    const con = mysql.createConnection(dbCon);

    con.connect();
    const sql = `SELECT * FROM ${req.query.Tablero} WHERE time = (SELECT Max(time) FROM ${req.query.Tablero}) ;`;
    con.query(sql, function(err, result) {
        if (err) throw err;
        console.log(result);
        res.json(result[0]);
    });
    con.end();
};

exports.search = (req, res) => {
    const con = mysql.createConnection(dbCon);
    con.connect();
    const sql = `SELECT * FROM ${req.body.Tablero}
                WHERE time BETWEEN ${req.body.initTime} and ${req.body.finalTime}
                ORDER BY time;`;
    con.query(sql, function(err, result) {
        if (err) throw err;
        console.log(result);
        response.json(result);
    });
    con.end();
};

exports.change = (req, res) => {
    request.post({
        url: 'http://dummy.restapiexample.com/api/v1/create',     //url de la raspberry
        body: req.body,
        json: true
      }, function(error, response, body){
         console.log(req.body);
    });
    res.send('done');
};

