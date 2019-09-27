var express = require('express');
var router = express.Router();
var connection = require('../db_connection');

router.get('/', function(req, res, next) {
  res.send('Welcome to GrubHub API layer');
});

router.post('/login', function(req, res, next) {
    let table = 'buyers';
    if(req.body.option === '2') {
      table = 'sellers';
    }
    connection.query(
      `SELECT * FROM ${table} WHERE email=?`, [req.body.email],
       (err, results, fields) => {
          if(err) {
             res.send({
                 success: false,
                 msg: "Something went wrong",
                 msgDesc: err
             })
          }
          if(results.length > 0) {
            if(results[0].password === req.body.password) {
              res.send({
                success: true,
                msg: "Successfully logged in",
                msgDesc: results[0]
              })
            } else {
              res.send({
                success: false,
                msg: "Incorrect password. Try again!",
                msgDesc: null
              })
            }
          } else {
            res.send({
              success: false,
              msg: "Couldn't find any user with the entered Email",
              msgDesc: null
            })
          }
       }
    );
});

router.post('/register-seller', function(req, res, next) {
  connection.query(
    `INSERT INTO sellers (name, email, password, rest_name, zipcode, address) 
      VALUES (?,?,?,?,?,?)`, [req.body.name, req.body.email, req.body.password, req.body.rest_name, req.body.rest_zipcode , req.body.rest_address] ,
     (err, results, fields) => {
        if(err) {
           console.log(err);
           res.send({
               success: false,
               msg: err.sqlMessage,
               msgDesc: err
           })
        } else if(typeof(results.insertId) === 'number') {
            res.send({
              success: true,
              msg: "Registered you successfully! Your journey to success has begun!",
              msgDesc: results
           }) 
        } else {
            res.send({
              success: false,
              msg: "We could not register the user",
              msgDesc: results
            }) 
        }
  })
});

router.post('/register-buyer', function(req, res, next) {
  connection.query(
    `INSERT INTO buyers (name, email, password, zipcode, address) 
      VALUES (?,?,?,?,?)`, [req.body.name, req.body.email, req.body.password, req.body.zipcode , req.body.address] ,
     (err, results, fields) => {
        if(err) {
           console.log(err);
           res.send({
               success: false,
               msg: err.sqlMessage,
               msgDesc: err
           })
        } else 
        if(typeof(results.insertId) === 'number') {
            res.send({
              success: true,
              msg: "Registered successfully! You will not go hungry anymore!!",
              msgDesc: results
           }) 
        } else {
            res.send({
              success: false,
              msg: "We could not register the user",
              msgDesc: results
            }) 
        }
  })
});
module.exports = router;
