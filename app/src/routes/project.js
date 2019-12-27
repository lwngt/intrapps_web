var express = require('express');
var router = express.Router();
let common_webserver_util = require("../common/common_webserver_util");
var common_webserver_util_func = new common_webserver_util();
let common_logs = require('../common/common_logs');
let common_logs_func = new common_logs;

let LOG_FILE_NAME = "project";

router.get('/', function (req, res, next) {
  // get apikey and secretkey
  let apikey = req.cookies.apikey;
  let secretkey = req.cookies.secretkey;
  let body = req.session.body;

  common_logs_func.output_log("apikey=" + req.cookies.apikey
    + " secretkey=" + req.cookies.secretkey
    + " backURL=" + req.session.backURL
    + " parameter=" + JSON.stringify(req.query),
    "EXECUTE", LOG_FILE_NAME);

  // set backurl
  if (req.headers.referer !== undefined && req.headers.referer !== null) {
    req.session.backURL
      = (req.headers.referer).replace(req.protocol + "://" + req.headers.host, '');;
  } else {
    req.session.backURL = "/dashboard"
  }

  if (apikey === undefined || secretkey === undefined) {
    req.session.error = common_webserver_util_func.get_logout_error_message();
    res.redirect("/login");
    return;
  }

  if (req.query.project_id === undefined || req.query.project_id === null) {
    req.session.body = body;
    req.session.error = common_webserver_util_func.get_parameter_error_message();
    let back_url = req.session.backURL || '/dashboard';
    res.redirect(back_url);
    return;
  }
  if (Number.isNaN(req.query.project_id)) {
    req.session.body = body;
    req.session.error = common_webserver_util_func.get_parameter_error_message();
    let back_url = req.session.backURL || '/dashboard';
    res.redirect(back_url);
    return;
  }

  let project_id = req.query.project_id;

  // project api execute
  common_webserver_util_func.execute_project_api(project_id, apikey, secretkey,
    (error, response, body) => {
      if (error !== null) {
        // error had been raised
        req.session.error = {
          code: error.code.code,
          status: error.code.status,
          message: error.code.message
        };
        let back_url = req.session.backURL || '/dashboard';
        res.redirect(back_url);
        return;
      } else {
        // success
        req.session.body = body;
        req.session.backURL = "/project?project_id=" + (JSON.parse(body)).data.project.id;
        let error_info = req.session.error;
        req.session.error = null;
        req.session.project_id = (JSON.parse(body)).data.project.id;
        res.render('project.ejs',
          {
            "page_result": JSON.parse(body),
            "screenshot": common_webserver_util_func.get_apiserver_screenshot_directory_path(),
            "icon": common_webserver_util_func.get_apiserver_icon_directory_path(),
            "plist": common_webserver_util_func.get_apiserver_plist_directory_path(),
            "apk": common_webserver_util_func.get_apiserver_apk_directory_path(),
            "error": error_info
          }
        );
        return;
      }
    }
  );

});

module.exports = router;
