let express = require('express');
let router = express.Router();
let common_webserver_util = require("../common/common_webserver_util");
let common_webserver_util_func = new common_webserver_util();
let common_logs = require('../common/common_logs');
let common_logs_func = new common_logs;

let LOG_FILE_NAME = "build_delete_execute";

router.post("/", function (req, res, next) {

  // get apikey and secretkey
  let apikey = req.cookies.apikey;
  let secretkey = req.cookies.secretkey;
  let body = req.session.body;

  common_logs_func.output_log("apikey=" + req.cookies.apikey
    + " secretkey=" + req.cookies.secretkey
    + " backURL=" + req.session.backURL
    + " parameter=" + JSON.stringify(req.body),
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
    if (check_body.data.sidebar.user_information.authority_content.delete === 0) {
      res.redirect("/dashboard");
      return;
    }
  }

  // check post parameter
  if (req.body.build_id === undefined || req.body.build_id === null) {
    req.session.body = body;
    req.session.error = common_webserver_util_func.get_parameter_error_message();
    let back_url = req.session.backURL || '/dashboard';
    res.redirect(back_url);
    return;
  }
  if (Number.isNaN(req.body.build_id)) {
    req.session.body = body;
    req.session.error = common_webserver_util_func.get_parameter_error_message();
    let back_url = req.session.backURL || '/dashboard';
    res.redirect(back_url);
    return;
  }
  let parameter = {
    "build_id": Number(req.body.build_id)
  };

  common_webserver_util_func.execute_delete_building_api(parameter, apikey, secretkey,
    (error, response, body) => {
      if (error !== null) {
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
        req.session.error = null;
        let back_url = '/dashboard';
        if (req.session.project_id !== undefined && req.session.project_id !== null) {
          back_url = "/project?project_id=" + req.session.project_id;
          req.session.project_id = null;
        }
        res.redirect(back_url);
        return;
      }
    });
});

module.exports = router;
