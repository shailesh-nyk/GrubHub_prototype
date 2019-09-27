var express = require('express');
var router = express.Router();
var connection = require('../db_connection');

//TO INSERT NEW SELLER/RESTAURANT
router.post('/', (req, res) => {
  console.log(req);
    connection.query(
      `INSERT INTO sellers (name, email, password, rest_name, zipcode) VALUES (${req.body.name}, ${req.body.email.toString()}, ${req.body.password}, ${req.body.rest_name}, ${req.body.zipcode})`,
      (err, results, fields) => {
        if(err) res.send(err);
        else res.send(results);
      }
    );
});

//TO ADD NEW SECTION
router.post('/sections', (req, res) => {
  console.log(req);
    connection.query(
      `INSERT INTO menu_sections (section_name, rest_id) VALUES (?,?)`, [req.body.section_name, req.body.rest_id] ,
      (err, results, fields) => {
        if(err) {
          console.log(err);
          res.send({
              success: false,
              msg: "Something went wrong",
              msgDesc: err
          })
        } else {
              console.log(results);
              res.send({
                success: true,
                msg: "Successfully added menu section" ,
                msgDesc: results
            }) 
        } 
      }
    );
});

//GET ALL SECTIONS
router.get('/sections', (req, res, next) => {
  connection.query(
    `select * from menu_sections where rest_id=?`, [req.query.rest_id],
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
              msg: "Got menu sections" ,
              msgDesc: results
          }) 
      } 
    }
  );
});

//TO ADD NEW ITEMS TO A RESTAURANT
router.post('/menu', (req, res) => {
    console.log("====================");
    console.log(req.body);
    connection.query(
      `INSERT INTO item_info (name, description, price, section) VALUES (?,?,?,?)`, [req.body.name, req.body.desc, req.body.price, req.body.section],
      (err, results, fields) => {
        if(err) {
          res.send({
              success: false,
              msg: "Something went wrong",
              msgDesc: err
          })
        } else {
              console.log("==================== INSERT INTO ITEM PHASE 1 SUCCESSFUL");
              console.log(results.insertId);
              let itemID = results.insertId;
              connection.query(
                `INSERT INTO restaurant_items (rest_id, item_id) VALUES (?,?)`, [req.body.rest_id, itemID],
                (err, results, fields) => {
                    if(err) {
                        res.send({
                          success: false,
                          msg: "Something went wrong",
                          msgDesc: err
                        })
                    } else {
                          console.log("==================== INSERT INTO RESTAURANT ITEMS SUCCESSFUL");
                          res.send({
                              success: true,
                              msg: "Successfully added new item",
                              msgDesc: itemID
                          })
                    }
                }
              )
        } 
      }
    );
});

//GET ITEMS SOLD BY A RESTAURANT
router.get('/menu', (req, res, next) => {
    connection.query(
      `select * from item_info where item_id in 
        (select item_id from restaurant_items where rest_id=?)`, [req.query.rest_id],
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
                msg: "Successfully fetched the items" ,
                msgDesc: results
            }) 
        } 
      }
    );
});

//GET SELLER PROFILE DETAILS
router.get('/', (req, res, next) => {
  connection.query(
    `select * from sellers where id=?`, [req.query.id],
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
              msg: "Successfully fetched the seller profile" ,
              msgDesc: results
          }) 
      } 
    }
  );
});

//UPDATE SELLER PROFILE
router.put('/', (req, res, next) => {
  connection.query(
    `UPDATE sellers SET name=? , address=? , email=? , password=?, zipcode=?,image=?, rest_name=? , cuisine=? WHERE id=?`,
    [req.body.name, req.body.address, req.body.email, req.body.password, req.body.zipcode, req.body.image, req.body.rest_name, req.body.cuisine, req.body.id],
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
              msg: "Successfully updated the restaurant seller profile" ,
              msgDesc: results
          }) 
      } 
    }
  );
});

module.exports = router;
