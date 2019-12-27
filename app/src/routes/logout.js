let express = require('express');
let router = express.Router();

let common_logs = require('../common/common_logs');
let common_logs_func = new common_logs;

let LOG_FILE_NAME = "logout";

router.get("/", function (req, res, next) {

  common_logs_func.output_log("apikey=" + req.cookies.apikey
    + " secretkey=" + req.cookies.secretkey
    + " parameter=" + JSON.stringify(req.query),
    "EXECUTE", LOG_FILE_NAME);

  req.session.error = null;
  req.session.destroy();
  res.clearCookie('apikey');
  res.clearCookie('secretkey');
  res.redirect("/login");
  return;
});

module.exports = router;
