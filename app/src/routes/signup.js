var express = require('express');
var router = express.Router();
let common_logs = require('../common/common_logs');
let common_logs_func = new common_logs;

let LOG_FILE_NAME = "signup";

router.get('/', function (req, res, next) {

  common_logs_func.output_log("apikey=" + req.cookies.apikey
    + " secretkey=" + req.cookies.secretkey
    + " parameter=" + JSON.stringify(req.query),
    "EXECUTE", LOG_FILE_NAME);

  res.render('signup.ejs', { req: req });
  req.session.destroy();
});

module.exports = router;
