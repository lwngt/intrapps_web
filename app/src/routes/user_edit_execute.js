var express = require('express');
var router = express.Router();
var multer = require('multer')

let common_webserver_util = require("../common/common_webserver_util");
var common_webserver_util_func = new common_webserver_util();

let common_logs = require('../common/common_logs');
let common_logs_func = new common_logs;

var upload = multer();

let LOG_FILE_NAME = "user_edit_execute";

router.post("/", upload.none(), function (req, res, next) {

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
  if (req.body.user_id === undefined || req.body.user_id === null) {
    req.session.error = common_webserver_util_func.get_parameter_error_message();
    let back_url = req.session.backURL || '/dashboard';
    res.redirect(back_url);
    return;
  }
  if (Number.isNaN(req.body.user_id)) {
    req.session.error = common_webserver_util_func.get_parameter_error_message();
    let back_url = req.session.backURL || '/dashboard';
    res.redirect(back_url);
    return;
  }
  let user_id = req.body.user_id;

  if (req.body.user_name === undefined || req.body.user_name === null) {
    req.session.error = common_webserver_util_func.get_parameter_error_message();
    let back_url = req.session.backURL || '/dashboard';
    res.redirect(back_url);
    return;
  }
  let user_name = req.body.user_name;

  if (req.body.user_password === undefined || req.body.user_password === null) {
    req.session.error = common_webserver_util_func.get_parameter_error_message();
    let back_url = req.session.backURL || '/dashboard';
    res.redirect(back_url);
    return;
  }
  let user_password = req.body.user_password;

  if (req.body.user_firstname === undefined || req.body.user_firstname === null) {
    req.session.error = common_webserver_util_func.get_parameter_error_message();
    let back_url = req.session.backURL || '/dashboard';
    res.redirect(back_url);
    return;
  }
  let user_firstname = req.body.user_firstname;

  if (req.body.user_lastname === undefined || req.body.user_lastname === null) {
    req.session.error = common_webserver_util_func.get_parameter_error_message();
    let back_url = req.session.backURL || '/dashboard';
    res.redirect(back_url);
    return;
  }
  let user_lastname = req.body.user_lastname;

  if (req.body.user_email === undefined || req.body.user_email === null) {
    req.session.error = common_webserver_util_func.get_parameter_error_message();
    let back_url = req.session.backURL || '/dashboard';
    res.redirect(back_url);
    return;
  }
  let user_email = req.body.user_email;

  let user_manage_projects = null;
  if (req.body.user_manage_projects !== undefined && req.body.user_manage_projects !== null) {
    user_manage_projects = req.body.user_manage_projects;
  }

  if (req.body.user_authority === undefined || req.body.user_authority === null) {
    req.session.error = common_webserver_util_func.get_parameter_error_message();
    let back_url = req.session.backURL || '/dashboard';
    res.redirect(back_url);
    return;
  }
  let user_authority = req.body.user_authority;


  let user_manage_projects_array = [];
  if (Array.isArray(user_manage_projects)) {
    user_manage_projects.forEach(project => {
      if (project.checked === "true") {
        user_manage_projects_array.push(Number(project.id));
      }
    });
  } else {
    if (user_manage_projects !== null
      && user_manage_projects.id !== undefined
      && user_manage_projects.id !== null) {
      if (user_manage_projects.checked === "true") {
        user_manage_projects_array.push(Number(user_manage_projects.id));
      }
    }
  }

  // set backurl
  if (req.headers.referer !== undefined && req.headers.referer !== null) {
    req.session.backURL
      = (req.headers.referer).replace(req.protocol + "://" + req.headers.host, '');;
  } else {
    req.session.backURL = "/dashboard"
  }

  // set parameter
  let parameter = {
    "username": user_name,
    "password": user_password,
    "email": user_email,
    "family_name": user_firstname,
    "given_name": user_lastname,
    "authority": user_authority,
    "user_manage_project_ids": user_manage_projects_array,
    "user_id": user_id
  };

  common_webserver_util_func.execute_user_edit_api(parameter, apikey, secretkey,
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
        let back_url = req.session.backURL || '/dashboard';
        req.session.error = null;
        res.redirect(back_url);
        return;
      }
    });
});

module.exports = router;
