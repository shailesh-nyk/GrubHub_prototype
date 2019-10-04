4//configs & dependencies
const express= require('express');
const app= express();
const logger = require('morgan');
app.use(express.json());
app.use(logger('dev'));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on ${port}...`)
})

app.post('/api/calculate', (req,res) => {
     try {
        let result = eval(req.body.expression);
        res.send({
            result: result,
            success: true
        });
     } catch {
        res.send({
            result: null,
            success: false
        });
     }
})

