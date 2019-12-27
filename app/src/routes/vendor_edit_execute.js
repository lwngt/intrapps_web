var express = require('express');
var router = express.Router();
let common_webserver_util = require("../common/common_webserver_util");
var common_webserver_util_func = new common_webserver_util();
let common_logs = require('../common/common_logs');
let common_logs_func = new common_logs;

let LOG_FILE_NAME = "vendor_edit_execute";

router.post("/", function (req, res, next) {

  common_logs_func.output_log("apikey=" + req.cookies.apikey
    + " secretkey=" + req.cookies.secretkey
    + " backURL=" + req.session.backURL
    + " parameter=" + JSON.stringify(req.body),
    "EXECUTE", LOG_FILE_NAME);

  // get apikey and secretkey
  let apikey = req.cookies.apikey;
  let secretkey = req.cookies.secretkey;
  let body = req.session.body;

  if (req.cookies.apikey === undefined
    || req.cookies.secretkey === undefined
    || req.session.body === undefined
    || req.session.body === null) {
    req.session.error = common_webserver_util_func.get_logout_error_message();
    res.redirect("/login");
    return;
  }

  if (req.session.body !== undefined && req.session.body !== null) {
    let check_body = JSON.parse(req.session.body);
    if (check_body.data.sidebar.user_information.authority_content.management_edit === 0) {
      res.redirect("/dashboard");
      return;
    }
  }

  // check post parameter
  if (req.body.contractor_user_id === undefined || req.body.contractor_user_id === null) {
    req.session.body = body;
    req.session.error = common_webserver_util_func.get_parameter_error_message();
    let back_url = req.session.backURL || '/dashboard';
    res.redirect(back_url);
    return;
  }
  if (Number.isFinite(req.body.contractor_user_id)) {
    req.session.body = body;
    req.session.error = common_webserver_util_func.get_parameter_error_message();
    let back_url = req.session.backURL || '/dashboard';
    res.redirect(back_url);
    return;
  }
  let contractor_user_id = req.body.contractor_user_id;

  if (contractor_user_id === "") {
    if (req.body.curent_contractor_user_id === undefined || req.body.curent_contractor_user_id === null) {
      req.session.body = body;
      req.session.error = common_webserver_util_func.get_parameter_error_message();
      let back_url = req.session.backURL || '/dashboard';
      res.redirect(back_url);
      return;
    }
    if (Number.isFinite(req.body.curent_contractor_user_id)) {
      req.session.body = body;
      req.session.error = common_webserver_util_func.get_parameter_error_message();
      let back_url = req.session.backURL || '/dashboard';
      res.redirect(back_url);
      return;
    }
    contractor_user_id = req.body.curent_contractor_user_id
  }

  if (req.body.user_country === undefined || req.body.user_country === null) {
    req.session.body = body;
    req.session.error = common_webserver_util_func.get_parameter_error_message();
    let back_url = req.session.backURL || '/dashboard';
    res.redirect(back_url);
    return;
  }
  let user_country = req.body.user_country;

  if (req.body.user_postal_code === undefined || req.body.user_postal_code === null) {
    req.session.body = body;
    req.session.error = common_webserver_util_func.get_parameter_error_message();
    let back_url = req.session.backURL || '/dashboard';
    res.redirect(back_url);
    return;
  }
  if (Number.isFinite(req.body.user_postal_code)) {
    req.session.body = body;
    req.session.error = common_webserver_util_func.get_parameter_error_message();
    let back_url = req.session.backURL || '/dashboard';
    res.redirect(back_url);
    return;
  }
  let user_postal_code = req.body.user_postal_code;

  if (req.body.user_province === undefined || req.body.user_province === null) {
    req.session.body = body;
    req.session.error = common_webserver_util_func.get_parameter_error_message();
    let back_url = req.session.backURL || '/dashboard';
    res.redirect(back_url);
    return;
  }
  let user_province = req.body.user_province;

  if (req.body.user_city === undefined || req.body.user_city === null) {
    req.session.body = body;
    req.session.error = common_webserver_util_func.get_parameter_error_message();
    let back_url = req.session.backURL || '/dashboard';
    res.redirect(back_url);
    return;
  }
  let user_city = req.body.user_city;

  if (req.body.user_address === undefined || req.body.user_address === null) {
    req.session.body = body;
    req.session.error = common_webserver_util_func.get_parameter_error_message();
    let back_url = req.session.backURL || '/dashboard';
    res.redirect(back_url);
    return;
  }
  let user_address = req.body.user_address;

  if (req.body.user_company === undefined || req.body.user_company === null) {
    req.session.body = body;
    req.session.error = common_webserver_util_func.get_parameter_error_message();
    let back_url = req.session.backURL || '/dashboard';
    res.redirect(back_url);
    return;
  }
  let user_company = req.body.user_company;

  if (req.body.user_tel === undefined || req.body.user_tel === null) {
    req.session.body = body;
    req.session.error = common_webserver_util_func.get_parameter_error_message();
    let back_url = req.session.backURL || '/dashboard';
    res.redirect(back_url);
    return;
  }
  let user_tel = req.body.user_tel;

  // set backurl
  if (req.headers.referer !== undefined && req.headers.referer !== null) {
    req.session.backURL
      = (req.headers.referer).replace(req.protocol + "://" + req.headers.host, '');;
  } else {
    req.session.backURL = "/dashboard"
  }

  // set parameter
  let parameter = {
    "contractor_user_id": contractor_user_id,
    "company": user_company,
    "country": user_country,
    "province": user_province,
    "city": user_city,
    "postalcode": user_postal_code,
    "address": user_address,
    "telephone_number": user_tel,
  };

  common_webserver_util_func.execute_edit_vendor_api(parameter, apikey, secretkey,
    (error, response, body) => {
      if (error !== null) {
        // error had been raised
        req.session.error = {
          code: error.code.code,
          status: error.code.status,
          message: error.code.message
        }
        let back_url = req.session.backURL || '/dashboard';
        res.redirect(back_url);
        return;
      } else {
        // success
        let back_url = req.session.backURL || '/vendor';
        req.session.error = null;
        res.redirect(back_url);
        return;
      }
    });
});

module.exports = router;
