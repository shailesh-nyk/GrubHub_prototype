var express = require('express');
var router = express.Router();
var connection = require('../db_connection');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

//GET BUYER PROFILE DETAILS
router.get('/', (req, res, next) => {
  connection.query(
    `select * from buyers where id=?`, [req.query.id],
     (err, results, fields) => {
      if(err) {
        res.send({
            success: false,
            msg: "Something went wrong",
            msgDesc: err
        })
      } else {

            res.send({
              success: true,
              msg: "Successfully fetched the buyer profile" ,
              msgDesc: results
          }) 
      } 
    }
  );
});

//UPDATE BUYER PROFILE
router.put('/', (req, res, next) => {
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    connection.query(
      `UPDATE buyers SET name=? , address=? , email=? , phone=? , password=?, zipcode=?,image=? WHERE id=?`,
      [req.body.name, req.body.address, req.body.email,req.body.phone, hash, req.body.zipcode, req.body.image, req.body.id],
       (err, results, fields) => {
        if(err) {
          res.send({
              success: false,
              msg: "Something went wrong",
              msgDesc: err
          })
        } else {
              res.send({
                success: true,
                msg: "Successfully updated your user profile" ,
                msgDesc: results
            }) 
        } 
      }
    );
  });
});



module.exports = router;
