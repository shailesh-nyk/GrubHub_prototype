var express = require('express');
var router = express.Router();
var connection = require('../db_connection');


router.get('/', (req, res, next) => {
    connection.query(
      `select * from sellers where id in (select rest_id from restaurant_items where item_id in (select item_id from item_info where name like ?))`,['%' + req.query.searchKey + '%'],
       (err, results, fields) => {
        if(err) {
            console.log(err);
          res.send({
              success: false,
              msg: "Something went wrong",
              content: err
          })
        } else {
              res.send({
                success: true,
                msg: "Got search results" ,
                content: results
            }) 
        } 
      }
    );
});


module.exports = router;
