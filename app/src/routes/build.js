var express = require('express');
var router = express.Router();
let common_webserver_util = require("../common/common_webserver_util");
var common_webserver_util_func = new common_webserver_util();
let common_logs = require('../common/common_logs');
let common_logs_func = new common_logs;

let LOG_FILE_NAME = "build";

router.get('/', function (req, res, next) {

  common_logs_func.output_log("apikey=" + req.cookies.apikey
    + " secretkey=" + req.cookies.secretkey
    + " backURL=" + req.session.backURL
    + " parameter=" + JSON.stringify(req.query),
    "EXECUTE", LOG_FILE_NAME);

  // get apikey and secretkey
  let apikey = req.cookies.apikey;
  let secretkey = req.cookies.secretkey;

  if (apikey === undefined || secretkey === undefined) {
    req.session.error = common_webserver_util_func.get_logout_error_message();
    res.redirect("/login");
    return;
  }

  // set backurl
  if (req.headers.referer !== undefined && req.headers.referer !== null) {
    req.session.backURL
      = (req.headers.referer).replace(req.protocol + "://" + req.headers.host, '');;
  } else {
    req.session.backURL = "/dashboard"
  }

  // check agument of build id
  let build_id = req.query.build_id;

  if (build_id === undefined || build_id === null || isNaN(build_id)) {
    let back_url = req.session.backURL || '/dashboard';
    // redirect previous page
    req.session.error = common_webserver_util_func.get_nodata_message();
    res.redirect(back_url);
    return;
  }

  // get error message
  let error = null
  if (req.session.error !== undefined && req.session.error !== null) {
    error = req.session.error;
  }

  let parameter = "?build_id=" + build_id;
  // building api execute
  common_webserver_util_func.execute_building_api(parameter, apikey, secretkey,
    (error, response, body) => {
      if (error !== null) {
        // error had been raised
        req.session.error = {
          code: error.code.code,
          status: error.code.status,
          message: error.code.message
        }
        // back to previous
        let back_url = req.session.backURL || '/dashboard';
        res.redirect(back_url);
        return;
      } else {
        // success
        let error_info = req.session.error;
        req.session.error = null;
        req.session.body = body;
        res.render('build.ejs',
          {
            "page_result": JSON.parse(req.session.body),
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
