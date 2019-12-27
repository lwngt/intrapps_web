var express = require('express');
var router = express.Router();
let common_webserver_util = require("../common/common_webserver_util");
var common_webserver_util_func = new common_webserver_util();
let common_logs = require('../common/common_logs');
let common_logs_func = new common_logs;

let LOG_FILE_NAME = "confirm_execute";

router.post("/", function (req, res, next) {

  common_logs_func.output_log("parameter=" + JSON.stringify(req.body),
    "EXECUTE", LOG_FILE_NAME);

  // clear session valiable
  req.session.backURL = null;

  let parameter = {
    username: req.body.confirm_user_name,
    code: req.body.confirm_code
  };

  common_webserver_util_func.execute_signup_confirm_api(parameter,
    (error, response, body) => {
      if (error !== null) {
        // error had been raised
        req.session.error = {
          code: error.code.code,
          status: error.code.status,
          message: error.code.message
        }
        res.redirect("/confirm");
        return;
      } else {
        // success
        req.session.destroy();
        res.clearCookie('apikey');
        res.clearCookie('secretkey');
        res.redirect("/login");
        return;
      }
    });

});

module.exports = router;
