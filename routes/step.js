var express = require('express');
var router = express.Router();
var axios = require('axios');


router.get('/', function(req, res, next) {
    return res.render('step', {step:1111})
});


module.exports = router;
