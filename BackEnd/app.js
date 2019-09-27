const express = require('express');
const logger = require('morgan');
const createError = require('http-errors');
const http = require('http');
var cors = require('cors');
var bodyParser = require('body-parser');

const app = express();
app.use(logger('dev'));
app.use('/public/', express.static('./public/'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => {
    console.log('API server listening on ', port)
});


app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

var indexRouter = require('./routes/index');
var buyerRouter = require('./routes/buyer');
var sellerRouter = require('./routes/seller');
var uploadRouter = require('./routes/upload');
var searchRouter = require('./routes/search');


app.use('/api', indexRouter);
app.use('/api/buyer', buyerRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/uploads', uploadRouter);
app.use('/api/search', searchRouter);

module.exports = app;
