var express = require('express');
var router = express.Router();

router.get('/callback/:code', function(req, res, next) {
  var params =req.params.code.split("#")[1].split("&");
  var user_id = '';
  var token = '';
  params.forEach(function (e) {
    if ((e.split("="))[0] == 'user_id') {
      user_id = e.split("=")[1];
    }
    else if ((e.split("="))[0] == 'access_token') {
      token = e.split("=")[1];
    }
  });
  req.session.token  = token;
  req.session.user_id  = user_id;


  res.render('oauth2-callback', { user_id:user_id});
});


module.exports = router;
