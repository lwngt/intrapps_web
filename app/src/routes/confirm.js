var express = require('express');
var router = express.Router();
let common_logs = require('../common/common_logs');
let common_logs_func = new common_logs;

let LOG_FILE_NAME = "confirm";

router.get('/', function (req, res, next) {

  common_logs_func.output_log("",
    "EXECUTE", LOG_FILE_NAME);

  res.clearCookie('apikey');
  res.clearCookie('secretkey');
  req.session.destroy();
  res.render('confirm.ejs', { req: req });
});

module.exports = router;
