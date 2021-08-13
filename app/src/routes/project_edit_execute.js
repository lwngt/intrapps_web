let express = require('express');
let router = express.Router();
let common_webserver_util = require("../common/common_webserver_util");
let common_webserver_util_func = new common_webserver_util();
let multer = require('multer');
let moment = require("moment");
const { v4: uuidv4 } = require('uuid');
let common_logs = require('../common/common_logs');
let common_logs_func = new common_logs;

let LOG_FILE_NAME = "project_edit_execute";

let timestamp = moment().unix(); // unix time stamp
let uuid = uuidv4().split('-').join(''); // uuid
let file = null;

let storage = multer.diskStorage({
  // Directory to save files
  destination: common_webserver_util_func.get_local_image_directory_path(),
  // File name to save (original uploaded file name)
  filename: (req, file_muter, cb) => {
    file = file_muter;
    timestamp = moment().unix();
    uuid = uuidv4().split('-').join('');
    cb(null, timestamp + "_" + uuid + "_" + file.originalname)
  }
});

let upload = multer({
  storage: storage,
  dist: '/'
});
let type = upload.array('project_images', 5);

router.post("/", type, (req, res, next) => {

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
    if (check_body.data.sidebar.user_information.authority_content.edit === 0) {
      res.redirect("/dashboard");
      return;
    }
  }

  // check post parameter
  if (req.body.project_id === undefined || req.body.project_id === null) {
    req.session.body = body;
    req.session.error = common_webserver_util_func.get_parameter_error_message();
    let back_url = req.session.backURL || '/dashboard';
    res.redirect(back_url);
    return;
  }
  if (Number.isNaN(req.body.project_id)) {
    req.session.body = body;
    req.session.error = common_webserver_util_func.get_parameter_error_message();
    let back_url = req.session.backURL || '/dashboard';
    res.redirect(back_url);
    return;
  }

  if (req.body.project_name === undefined || req.body.project_name === null) {
    req.session.body = body;
    req.session.error = common_webserver_util_func.get_parameter_error_message();
    let back_url = req.session.backURL || '/dashboard';
    res.redirect(back_url);
    return;
  }

  if (req.body.project_overview === undefined || req.body.project_overview === null) {
    req.session.body = body;
    req.session.error = common_webserver_util_func.get_parameter_error_message();
    let back_url = req.session.backURL || '/dashboard';
    res.redirect(back_url);
    return;
  }

  let project_images_modify = req.body.project_images_modify.split(',');
  if (req.body.project_images_modify === undefined
    || req.body.project_images_modify === null
    || Array.isArray(project_images_modify) === false) {
    req.session.body = body;
    req.session.error = common_webserver_util_func.get_parameter_error_message();
    let back_url = req.session.backURL || '/dashboard';
    res.redirect(back_url);
    return;
  }

  let parameter = {
    "project_id": req.body.project_id,
    "project_name": req.body.project_name,
    "project_overview": req.body.project_overview,
    "project_images": req.files,
    "project_images_modify": project_images_modify
  };

  common_webserver_util_func.execute_edit_project_api(parameter, apikey, secretkey,
    (error, response, body) => {
      if (error !== null) {
        // error had been raised
        req.session.error = {
          code: error.code.code,
          status: error.code.status,
          message: error.code.message
        }
        JSON.stringify
        common_webserver_util_func.upload_file_delete(req.files);
        global.project_edit_request = undefined;
        let back_url = req.session.backURL || '/dashboard';
        res.redirect(back_url);
        return;
      } else {
        // success
        let back_url = req.session.backURL || '/dashboard';
        common_webserver_util_func.upload_file_delete(req.files);
        global.project_edit_request = undefined;
        req.session.body = body;
        req.session.error = null;
        res.redirect(back_url);
        return;
      }
    });
});

module.exports = router;
