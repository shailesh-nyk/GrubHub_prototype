var express = require('express');
var router = express.Router();
var connection = require('../db_connection');

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
  connection.query(
    `UPDATE buyers SET name=? , address=? , email=? , password=?, zipcode=?,image=? WHERE id=?`,
    [req.body.name, req.body.address, req.body.email, req.body.password, req.body.zipcode, req.body.image, req.body.id],
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



module.exports = router;
