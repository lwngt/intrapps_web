var express = require('express');
var router = express.Router();
let common_webserver_util = require("../common/common_webserver_util");
var common_webserver_util_func = new common_webserver_util();
let common_logs = require('../common/common_logs');
let common_logs_func = new common_logs;

let LOG_FILE_NAME = "dashboard";

router.get('/', function (req, res, next) {
  // get apikey and secretkey
  let apikey = req.cookies.apikey;
  let secretkey = req.cookies.secretkey;

  common_logs_func.output_log("apikey=" + req.cookies.apikey
    + " secretkey=" + req.cookies.secretkey
    + " backURL=" + req.session.backURL
    + " parameter=" + JSON.stringify(req.query),
    "EXECUTE", LOG_FILE_NAME);

  if (apikey === undefined || secretkey === undefined) {
    req.session.error = common_webserver_util_func.get_logout_error_message();
    res.redirect("/login");
    return;
  }

  // clear session valiable
  req.session.backURL = null;

  // check agument of page no
  let page_no = req.query.page_no;
  if (page_no === undefined || page_no === null) {
    res.redirect("/dashboard?page_no=1");
    return;
  } else if (isNaN(page_no)) {
    let error_message = common_webserver_util_func.get_nodata_message();
    res.render('dashboard.ejs', { "page_result": null, "error": error_message });
    return;
  }

  let parameter = "?page_no=" + page_no;
  // latest api execute
  common_webserver_util_func.execute_latest_api(parameter, apikey, secretkey,
    (error, response, body) => {
      if (error !== null) {
        // error had been raised
        req.session.error = {
          code: error.code.code,
          status: error.code.status,
          message: error.code.message
        }
        // error display
        res.render('dashboard.ejs',
          {
            "page_result": null,
            "icon": common_webserver_util_func.get_apiserver_icon_directory_path(),
            "plist": common_webserver_util_func.get_apiserver_plist_directory_path(),
            "apk": common_webserver_util_func.get_apiserver_apk_directory_path(),
            "error": req.session.error
          });
        return;
      } else {
        // success
        req.session.body = body;
        let error_info = req.session.error;
        req.session.error = null;
        res.render('dashboard.ejs',
          {
            "page_result": JSON.parse(body),
            "icon": common_webserver_util_func.get_apiserver_icon_directory_path(),
            "plist": common_webserver_util_func.get_apiserver_plist_directory_path(),
            "apk": common_webserver_util_func.get_apiserver_apk_directory_path(),
            "error": error_info
          });
        return;
      }
    }
  );

});

module.exports = router;
