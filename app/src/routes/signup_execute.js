var express = require('express');
var router = express.Router();
let common_webserver_util = require("../common/common_webserver_util");
var common_webserver_util_func = new common_webserver_util();
let common_logs = require('../common/common_logs');
let common_logs_func = new common_logs;

let LOG_FILE_NAME = "signup_execute";

router.post("/", function (req, res, next) {

  common_logs_func.output_log("apikey=" + req.cookies.apikey
    + " secretkey=" + req.cookies.secretkey
    + " backURL=" + req.session.backURL
    + " parameter=" + JSON.stringify(req.body),
    "EXECUTE", LOG_FILE_NAME);

  let parameter = {
    username: req.body.user_name,
    password: req.body.user_password,
    address: req.body.user_address,
    email: req.body.user_email,
    family_name: req.body.user_lastname,
    given_name: req.body.user_firstname,
    company: req.body.user_company,
    country: req.body.user_country,
    province: req.body.user_province,
    city: req.body.user_city,
    postalcode: req.body.user_postal_code,
    telephone_number: req.body.user_tel
  };

  common_webserver_util_func.execute_signup_api(parameter,
    (error, response, body) => {
      if (response === null) {
        // error had been raised
        req.session.error = {
          code: error.code.code,
          status: error.code.status,
          message: error.code.message
        }
        res.redirect("/signup");
      } else {
        // success
        res.render("signup_execute.ejs");
      }
    });

});

module.exports = router;
