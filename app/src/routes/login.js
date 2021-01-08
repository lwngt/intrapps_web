var express = require('express');
var router = express.Router();
let common_logs = require('../common/common_logs');
let common_logs_func = new common_logs;

let LOG_FILE_NAME = "login";

router.get('/', function (req, res, next) {

  // clear session valiable
  req.session.backURL = null;

  common_logs_func.output_log("",
    "EXECUTE", LOG_FILE_NAME);

  if (req.cookies.apikey !== undefined && req.cookies.secretkey !== undefined) {
    if ((req.cookies.apikey !== null && req.cookies.apikey !== "")
      && (req.cookies.secretkey !== null && req.cookies.secretkey !== "")) {
      res.redirect("/dashboard");
      return;
    }
  }
  res.clearCookie('apikey');
  res.clearCookie('secretkey');
  let error_message = null
  if (req.session.error !== undefined && req.session.error) {
    error_message = req.session.error
  }
  req.session.destroy();
  res.render('login.ejs', { req: req, error: error_message });
  return;
});

module.exports = router;
