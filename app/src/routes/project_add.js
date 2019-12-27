var express = require('express');
var router = express.Router();
let common_webserver_util = require("../common/common_webserver_util");
var common_webserver_util_func = new common_webserver_util();
let common_logs = require('../common/common_logs');
let common_logs_func = new common_logs;

let LOG_FILE_NAME = "project_add";

router.get('/', function (req, res, next) {
  // get apikey and secretkey
  let apikey = req.cookies.apikey;
  let secretkey = req.cookies.secretkey;

  common_logs_func.output_log("apikey=" + req.cookies.apikey
    + " secretkey=" + req.cookies.secretkey
    + " backURL=" + req.session.backURL
    + " parameter=" + JSON.stringify(req.query),
    "EXECUTE", LOG_FILE_NAME);

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
    if (check_body.data.sidebar.user_information.authority_content.add === 0) {
      res.redirect("/dashboard");
      return;
    }
  }

  // set backurl
  if (req.headers.referer !== undefined && req.headers.referer !== null) {
    req.session.backURL
      = (req.headers.referer).replace(req.protocol + "://" + req.headers.host, '');;
  } else {
    req.session.backURL = "/dashboard"
  }

  // project api execute
  common_webserver_util_func.execute_projects_api(apikey, secretkey,
    (error, response, body) => {
      if (response === null) {
        // error had been raised
        req.session.error = {
          code: error.code.code,
          status: error.code.status,
          message: error.code.message
        }
        // error display
        let back_url = req.session.backURL || '/dashboard';
        res.redirect(back_url);
        return;
      } else {
        // success
        req.session.backURL = "/projects";
        let error_info = req.session.error;
        req.session.error = null;
        req.session.body = body;

        let check_body = JSON.parse(body);
        if (check_body.data.sidebar.user_information.authority_content.add === 0) {
          res.redirect("/dashboard");
          return;
        }

        res.render('project_add.ejs', {
          "page_result": JSON.parse(body),
          "error": error_info,
        });
        return;
      }
    }
  );
});

module.exports = router;
