var express = require('express');
var router = express.Router();
var connection = require('../db_connection');


router.post('/', (req, res) => {
    console.log(req);
      connection.query(
        `INSERT INTO orders (rest_id, cust_id) VALUES (? , ?)`, [req.body.rest_id, req.body.cust_id],
        (err, results, fields) => {
          if(err) {
            console.log(err);
            res.send({
                success: false,
                msg: "Something went wrong",
                msgDesc: err
            })
          } else {
                let order_id = results.insertId;
                let status = true;
                req.body.items.forEach(item => {
                    connection.query(
                        `INSERT INTO order_items (order_id, item_id, quantity, price) VALUES (?,?,?,?)`, [order_id, item.item_id, item.count, item.count * item.price],
                        (err, results, fields) => { 
                            if(err) {
                                console.log(err);
                                status = false;
                                res.send({
                                    success: false,
                                    msg: "Something went wrong",
                                    msgDesc: err
                                })
                            }
                        }
                    )
                })
                if(status) {
                    res.send({
                        success: true,
                        msg: "Successfully placed your order" ,
                        msgDesc: order_id
                    }) 
                }
          } 
        }
      );
});

router.get('/customer', (req, res, next) => {
    connection.query(
        `select O.order_id, O.status, S.rest_name, S.image as rest_img, S.address, S.zipcode,S.phone, OI.quantity, I.name as item_name, I.image as item_img, OI.price, I.description, O.order_ts 
        from orders O 
        inner join sellers S on O.rest_id = S.id 
        inner join order_items OI on O.order_id = OI.order_id 
        inner join item_info I on OI.item_id = I.item_id
        where O.cust_id = ?
        order by O.order_ts desc`, [req.query.cust_id],
       (err, results, fields) => {
        if(err) {
          res.send({
              success: false,
              msg: "Something went wrong",
              msgDesc: err
          })
        } else {
                let obj = {};
                let arr = [];
                let total = 0;
                console.log(results);
                results.forEach(row => {
                    if(!obj.hasOwnProperty(row.order_id)) {
                        obj[row.order_id] = {};
                        obj[row.order_id]['order_id'] = row.order_id;
                        obj[row.order_id]['rest_img'] = row.rest_img;
                        obj[row.order_id]['rest_name'] = row.rest_name;
                        obj[row.order_id]['status'] = row.status;
                        obj[row.order_id]['zipcode'] = row.zipcode;
                        obj[row.order_id]['phone'] = row.phone;
                        obj[row.order_id]['address'] = row.address;
                        obj[row.order_id]['date'] = row.order_ts.split(' ')[0].split('-').reverse().join('-');
                        let time = row.order_ts.split(' ')[1].split(':');
                        if(time[0] > 12) timestr = time[0]%12 + ":" + time[1] + ' PM'
                        else timestr = time[0] + ":" + time[1] + ' AM' 
                        obj[row.order_id]['time'] = timestr;
                        obj[row.order_id]['itemList'] = [];
                        obj[row.order_id]['total'] = 0;
                    } 
                    obj[row.order_id]['itemList'].push({
                        name: row.item_name,
                        img: row.item_img,
                        price: row.price,
                        desc: row.description,
                        qty: row.quantity
                    })
                    obj[row.order_id]['total'] += row.price;
                })
               Object.keys(obj).forEach(key => arr.push(obj[key]));
               arr.sort((a,b) => {
                let A = parseInt(a.order_id);
                let B = parseInt(b.order_id);
                if(A > B) return -1 
                else return 1
              })
               res.send({
                success: true,
                msg: "Successfully fetched the buyer profile" ,
                msgDesc: arr
              }) 
        } 
      }
    );
  });
  
router.get('/restaurant', (req, res, next) => {
    connection.query(
      `select O.order_id, O.status, B.name as rest_name, B.image as rest_img, B.address, B.zipcode, B.phone, OI.quantity, I.name as item_name, I.image as item_img, OI.price, I.description , O.order_ts
      from orders O 
      inner join buyers B on O.cust_id = B.id 
      inner join order_items OI on O.order_id = OI.order_id 
      inner join item_info I on OI.item_id = I.item_id
      where O.rest_id = ?
      order by O.order_ts desc`, [req.query.rest_id],
       (err, results, fields) => {
        if(err) {
          res.send({
              success: false,
              msg: "Something went wrong",
              msgDesc: err
          })
        } else {
                let obj = {};
                let arr = [];
                let total = 0;
                results.forEach(row => {
                    if(!obj.hasOwnProperty(row.order_id)) {
                        obj[row.order_id] = {};
                        obj[row.order_id]['order_id'] = row.order_id;
                        obj[row.order_id]['rest_img'] = row.rest_img;
                        obj[row.order_id]['rest_name'] = row.rest_name;
                        obj[row.order_id]['status'] = row.status;
                        obj[row.order_id]['zipcode'] = row.zipcode;
                        obj[row.order_id]['phone'] = row.phone;
                        obj[row.order_id]['address'] = row.address;
                        obj[row.order_id]['date'] = row.order_ts.split(' ')[0].split('-').reverse().join('-');
                        let time = row.order_ts.split(' ')[1].split(':');
                        if(time[0] > 12) timestr = time[0]%12 + ":" + time[1] + ' PM'
                        else timestr = time[0] + ":" + time[1] + ' AM' 
                        obj[row.order_id]['time'] = timestr;
                        obj[row.order_id]['itemList'] = [];
                        obj[row.order_id]['total'] = 0;
                    } 
                    obj[row.order_id]['itemList'].push({
                        name: row.item_name,
                        img: row.item_img,
                        price: row.price,
                        desc: row.description,
                        qty: row.quantity
                    })
                    obj[row.order_id]['total'] += row.price;
                })
               Object.keys(obj).forEach(key => arr.push(obj[key]));
               arr.sort((a,b) => {
                  let A = parseInt(a.order_id);
                  let B = parseInt(b.order_id);
                  if(A > B) return -1 
                  else return 1
               })
               res.send({
                success: true,
                msg: "Successfully fetched your orders" ,
                msgDesc: arr
              }) 
        } 
      }
    );
});

//UPDATE ORDER STATUS
router.put('/', (req, res, next) => {
  connection.query(
    `UPDATE orders SET status=? WHERE order_id=?`,[req.body.status, req.body.order_id],
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
              msg: "Successfully updated the order status" ,
              msgDesc: results
          }) 
      } 
    }
  );
});


module.exports = router;
