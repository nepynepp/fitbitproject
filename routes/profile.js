var express = require('express');
var router = express.Router();
var axios = require('axios');


router.get('/', function(req, res, next) {
    var token = req.session.token;
    var user_id = req.session.user_id;
    //var date = req.params.year + '-' + req.params.month + '-' + req.params.day;

    axios.get('https://api.fitbit.com/1/user/' + user_id + '/profile.json',
        {headers: {'Authorization': 'Bearer ' + token}})
        .then(function (response) {
           // console.log(response.data.goals.steps)
            return res.render('profile', {profile:response.data.user.displayName})

        })
        .catch(function (response) {
            return res.json({data:response});
        });

});


module.exports = router;
