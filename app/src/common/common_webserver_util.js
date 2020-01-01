'use strict';

let webclient = require('request');
let fs = require('fs');
let Message_Comm = require('./common_message');
let Message_Comm_Func = new Message_Comm();

// class : Web_Server_Util
// memo  : common class for usful tool
class Web_Server_Util {

  // Function : upload_file_delete
  // Argument : files / array of files to be deleted
  // response : none
  upload_file_delete(files) {
    if (files !== null || Array.isArray(files)) {
      if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          fs.unlinkSync(files[i].path);
        }
      }
    }
  }

  // Function : upload_single_file_delete
  // Argument : files / array of files to be deleted
  // response : none
  upload_single_file_delete(file) {
    if (file !== null) {
      fs.unlinkSync(file);
    }
  }

  // Function : get_webserver_root_path
  // Argument : none
  // response : webserver root path
  get_webserver_root_path() {
    let config = get_confing_information();
    return config.web.web_root_path;
  }

  // Function : execute_signup_api
  // Argument : parameter / parameter for api
  //          : callback  / callback function for result (need 3 argument)
  // response : none
  execute_signup_api(parameter, callback) {
    let config = get_confing_information();
    let api_path = config.api.api_server + config.api.kind.signup;
    execute_post_api(api_path, parameter, null, null, callback);
  }

  // Function : execute_signup_confirm_api
  // Argument : parameter / parameter for api
  //          : callback  / callback function for result (need 3 argument)
  // response : none
  execute_signup_confirm_api(parameter, callback) {
    let config = get_confing_information();
    let api_path = config.api.api_server + config.api.kind.signup_confirm;
    execute_post_api(api_path, parameter, null, null, callback);
  }

  // Function : execute_login_api
  // Argument : parameter / parameter for api
  //          : callback  / callback function for result (need 3 argument)
  // response : apikey, secretkey
  execute_login_api(parameter, callback) {
    let config = get_confing_information();
    let api_path = config.api.api_server + config.api.kind.login;
    execute_post_api(api_path, parameter, null, null, callback);
  }

  // Function : execute_check_cookie_api
  // Argument : parameter / parameter for api
  //          : apikey    / api key(api argument to specify project)
  //          : secretkey / secretkey(api argument to authorize)
  //          : callback  / callback function for result (need 3 argument)
  // response : true / false
  execute_check_cookie_api(parameter, apikey, secretkey, callback) {
    let config = get_confing_information();
    let api_path = config.api.api_server + config.api.kind.login_check;
    execute_post_api(api_path, parameter, apikey, secretkey, callback);
  }

  // Function : execute_report_add_api
  // Argument : parameter / parameter for api
  //          : apikey    / api key(api argument to specify project)
  //          : secretkey / secretkey(api argument to authorize)
  //          : callback  / callback function for result (need 3 argument)
  // response : true / false
  execute_report_add_api(parameter, apikey, secretkey, callback) {
    let config = get_confing_information();
    let api_path = config.api.api_server + config.api.kind.add_report;
    execute_post_api(api_path, parameter, apikey, secretkey, callback);
  }

  // Function : execute_report_edit_api
  // Argument : parameter / parameter for api
  //          : apikey    / api key(api argument to specify project)
  //          : secretkey / secretkey(api argument to authorize)
  //          : callback  / callback function for result (need 3 argument)
  // response : true / false
  execute_report_edit_api(parameter, apikey, secretkey, callback) {
    let config = get_confing_information();
    let api_path = config.api.api_server + config.api.kind.edit_report;
    execute_post_api(api_path, parameter, apikey, secretkey, callback);
  }

  // Function : execute_report_delete_api
  // Argument : parameter / parameter for api
  //          : apikey    / api key(api argument to specify project)
  //          : secretkey / secretkey(api argument to authorize)
  //          : callback  / callback function for result (need 3 argument)
  // response : true / false
  execute_report_delete_api(parameter, apikey, secretkey, callback) {
    let config = get_confing_information();
    let api_path = config.api.api_server + config.api.kind.delete_report;
    execute_post_api(api_path, parameter, apikey, secretkey, callback);
  }

  // Function : execute_building_api
  // Argument : parameter / parameter for api
  //          : apikey    / api key(api argument to specify project)
  //          : secretkey / secretkey(api argument to authorize)
  //          : callback  / callback function for result (need 3 argument)
  // response : true / false
  execute_building_api(parameter, apikey, secretkey, callback) {
    let config = get_confing_information();
    let api_path = config.api.api_server + config.api.kind.building;
    execute_get_api(api_path, parameter, apikey, secretkey, callback);
  }

  // Function : execute_add_build_api
  // Argument : parameter / parameter for api
  //          : apikey    / api key(api argument to specify project)
  //          : secretkey / secretkey(api argument to authorize)
  //          : callback  / callback function for result (need 3 argument)
  // response : true / false
  execute_add_build_api(parameter, apikey, secretkey, callback) {
    let config = get_confing_information();

    // create form data
    let build_app_image =
    {
      value: fs.createReadStream(parameter.build_app),
      options: { filename: parameter.original_filename }
    };

    const form_data = {
      'project_id': parameter.project_id,
      'release_note': parameter.release_note,
      'build_app': build_app_image
    };

    execute_form_post(form_data, config.api.api_server + config.api.kind.add_building
      , apikey, secretkey, callback);
  }

  // Function : execute_edit_building_api
  // Argument : parameter / parameter for api
  //          : apikey    / api key(api argument to specify project)
  //          : secretkey / secretkey(api argument to authorize)
  //          : callback  / callback function for result (need 3 argument)
  // response : true / false
  execute_edit_building_api(parameter, apikey, secretkey, callback) {
    let config = get_confing_information();
    let api_path = config.api.api_server + config.api.kind.edit_building;
    execute_post_api(api_path, parameter, apikey, secretkey, callback);
  }

  // Function : execute_delete_building_api
  // Argument : build_id   / build id for api
  //          : apikey    / api key(api argument to specify project)
  //          : secretkey / secretkey(api argument to authorize)
  //          : callback   / callback function for result (need 3 argument)
  // response : true / false
  execute_delete_building_api(parameter, apikey, secretkey, callback) {
    let config = get_confing_information();
    let api_path = config.api.api_server + config.api.kind.delete_building;
    execute_post_api(api_path, parameter, apikey, secretkey, callback);
  }
  // Function : execute_add_project_api
  // Argument : parameter / parameter for api
  //          : apikey    / api key(api argument to specify project)
  //          : secretkey / secretkey(api argument to authorize)
  //          : form_data / form data to submit for api server
  //          : callback  / callback function for result (need 3 argument)
  // response : true / false
  execute_add_project_api(parameter, apikey, secretkey, callback) {
    let config = get_confing_information();

    // create form data
    let project_images = [];
    if (parameter.project_images !== undefined && Array.isArray(parameter.project_images)) {
      if (parameter.project_images.length > 0) {
        parameter.project_images.forEach(file => {
          project_images.push(
            { value: fs.createReadStream(file.path), options: { filename: file.filename } }
          );
        });
      }
    }

    const form_data = {
      'project_name': parameter.project_name,
      'project_overview': parameter.project_overview,
      'project_images': project_images
    };

    // execute post
    execute_form_post(form_data, config.api.api_server + config.api.kind.add_project
      , apikey, secretkey, callback);
  }

  // Function : execute_edit_project_api
  // Argument : parameter / parameter for api
  //          : apikey    / api key(api argument to specify project)
  //          : secretkey / secretkey(api argument to authorize)
  //          : form_data / form data to submit for api server
  //          : callback  / callback function for result (need 3 argument)
  // response : true / false
  execute_edit_project_api(parameter, apikey, secretkey, callback) {
    let config = get_confing_information();

    // create form data
    let project_images = [];
    if (parameter.project_images !== undefined && Array.isArray(parameter.project_images) !== false) {
      parameter.project_images.forEach(file => {
        project_images.push(
          { value: fs.createReadStream(file.path), options: { filename: file.filename } }
        );
      });
    }

    const form_data = {
      'project_id': parameter.project_id,
      'project_name': parameter.project_name,
      'project_overview': parameter.project_overview,
      'project_images': project_images,
      'project_images_modify': parameter.project_images_modify
    };

    // execute post
    execute_form_post(form_data, config.api.api_server + config.api.kind.edit_project
      , apikey, secretkey, callback);
  }

  // Function : execute_delete_project_api
  // Argument : parameter / parameter for api
  //          : apikey    / api key(api argument to specify project)
  //          : secretkey / secretkey(api argument to authorize)
  //          : form_data / form data to submit for api server
  //          : callback  / callback function for result (need 3 argument)
  // response : true / false
  execute_delete_project_api(parameter, apikey, secretkey, callback) {
    let config = get_confing_information();
    let api_path = config.api.api_server + config.api.kind.delete_project;
    execute_post_api(api_path, parameter, apikey, secretkey, callback);
  }

  // Function : execute_latest_api
  // Argument : parameter / query string for api
  //          : apikey    / api key(api argument to specify project)
  //          : secretkey / secretkey(api argument to authorize)
  //          : callback  / callback function for result (need 3 argument)
  // response : response of dashboard api
  execute_latest_api(parameter, apikey, secretkey, callback) {
    let config = get_confing_information();
    let api_path = config.api.api_server + config.api.kind.latest;
    execute_get_api(api_path, parameter, apikey, secretkey, callback);
  }

  // Function : execute_projects_api
  // Argument : callback  / callback function for result (need 3 argument)
  // response : response of dashboard api
  execute_projects_api(apikey, secretkey, callback) {
    let config = get_confing_information();
    let api_path = config.api.api_server + config.api.kind.projects;
    execute_get_api(api_path, null, apikey, secretkey, callback);
  }

  // Function : execute_project_api
  // Argument : project_id  / project id for api
  //          : apikey      / api key(api argument to specify project)
  //          : secretkey   / secretkey(api argument to authorize)
  //          : callback    / callback function for result (need 3 argument)
  // response : true / false
  execute_project_api(project_id, apikey, secretkey, callback) {
    let config = get_confing_information();
    let api_path = config.api.api_server + config.api.kind.project;
    execute_get_api(api_path, "?project_id=" + project_id, apikey, secretkey, callback);
  }

  // Function : execute_users_api
  // Argument : apikey    / api key(api argument to specify project)
  //          : secretkey / secretkey(api argument to authorize)
  //          : callback  / callback function for result (need 3 argument)
  // response : true / false
  execute_users_api(apikey, secretkey, callback) {
    let config = get_confing_information();
    let api_path = config.api.api_server + config.api.kind.users;
    execute_get_api(api_path, "", apikey, secretkey, callback);
  }

  // Function : execute_user_api
  // Argument : user_id   / user id for api
  //          : apikey    / api key(api argument to specify project)
  //          : secretkey / secretkey(api argument to authorize)
  //          : callback  / callback function for result (need 3 argument)
  // response : true / false
  execute_user_api(user_id, apikey, secretkey, callback) {
    let config = get_confing_information();
    let api_path = config.api.api_server + config.api.kind.user;
    if (user_id === "" || user_id === null) {
      execute_get_api(api_path, null, apikey, secretkey, callback);
    } else {
      execute_get_api(api_path, "?user_id=" + user_id, apikey, secretkey, callback);
    }
  }

  // Function : execute_user_add_api
  // Argument : parameter / query string for api
  //          : apikey    / api key(api argument to specify project)
  //          : secretkey / secretkey(api argument to authorize)
  //          : callback  / callback function for result (need 3 argument)
  // response : true / false
  execute_user_add_api(parameter, apikey, secretkey, callback) {
    let config = get_confing_information();
    let api_path = config.api.api_server + config.api.kind.add_user;
    execute_post_api(api_path, parameter, apikey, secretkey, callback);
  }

  // Function : execute_user_edit_api
  // Argument : parameter / query string for api
  //          : apikey    / api key(api argument to specify project)
  //          : secretkey / secretkey(api argument to authorize)
  //          : callback  / callback function for result (need 3 argument)
  // response : true / false
  execute_user_edit_api(parameter, apikey, secretkey, callback) {
    let config = get_confing_information();
    let api_path = config.api.api_server + config.api.kind.edit_user;
    execute_post_api(api_path, parameter, apikey, secretkey, callback);
  }

  // Function : execute_user_delete_api
  // Argument : parameter / query string for api
  //          : apikey    / api key(api argument to specify project)
  //          : secretkey / secretkey(api argument to authorize)
  //          : callback  / callback function for result (need 3 argument)
  // response : true / false
  execute_user_delete_api(parameter, apikey, secretkey, callback) {
    let config = get_confing_information();
    let api_path = config.api.api_server + config.api.kind.delete_user;
    execute_post_api(api_path, parameter, apikey, secretkey, callback);
  }

  // Function : execute_edit_vendor_api
  // Argument : parameter / parameter for api
  //          : apikey    / api key(api argument to specify project)
  //          : secretkey / secretkey(api argument to authorize)
  //          : callback  / callback function for result (need 3 argument)
  // response : true / false
  execute_edit_vendor_api(parameter, apikey, secretkey, callback) {
    let config = get_confing_information();
    let api_path = config.api.api_server + config.api.kind.edit_vendor;
    execute_post_api(api_path, parameter, apikey, secretkey, callback);
  }

  // Function : execute_delete_vendor_api
  // Argument : apikey    / api key(api argument to specify project)
  //          : secretkey / secretkey(api argument to authorize)
  //          : callback  / callback function for result (need 3 argument)
  // response : true / false
  execute_delete_vendor_api(parameter, apikey, secretkey, callback) {
    let config = get_confing_information();
    let api_path = config.api.api_server + config.api.kind.delete_vendor;
    execute_post_api(api_path, parameter, apikey, secretkey, callback);
  }

  // Function : execute_vendor_api
  // Argument : user_id   / user id for api
  //          : apikey    / api key(api argument to specify project)
  //          : secretkey / secretkey(api argument to authorize)
  //          : callback  / callback function for result (need 3 argument)
  // response : true / false
  execute_vendor_api(apikey, secretkey, callback) {
    let config = get_confing_information();
    let api_path = config.api.api_server + config.api.kind.vendor;
    execute_get_api(api_path, "", apikey, secretkey, callback);
  }

  // Function : get_image_directory_path
  // Argument : none
  // response : image directory path
  get_local_image_directory_path() {
    let config = get_confing_information();
    let image_path = config.storage.base + config.storage.local.IMAGE;
    return image_path;
  }

  // Function : get_app_directory_path
  // Argument : none
  // response : image directory path
  get_app_directory_path() {
    let config = get_confing_information();
    let app_path = config.storage.base + config.storage.local.APP;
    return app_path;
  }

  // Function : get_apiserver_plist_directory_path
  // Argument : none
  // response : plist directory path of api server
  get_apiserver_plist_directory_path() {
    let config = get_confing_information();
    let plist_path = config.api.api_server_files.PLIST;
    return plist_path;
  }

  // Function : get_apiserver_apk_directory_path
  // Argument : none
  // response : apk directory path of api server
  get_apiserver_apk_directory_path() {
    let config = get_confing_information();
    let apk_path = config.api.api_server_files.APK;
    return apk_path;
  }

  // Function : get_apiserver_screenshot_directory_path
  // Argument : none
  // response : screenshot directory path of api server
  get_apiserver_screenshot_directory_path() {
    let config = get_confing_information();
    let image_path = config.api.api_server_image.SCREENSHOT;
    return image_path;
  }

  // Function : get_apiserver_icon_directory_path
  // Argument : none
  // response : icon directory path of api server
  get_apiserver_icon_directory_path() {
    let config = get_confing_information();
    let image_path = config.api.api_server_image.ICON;
    return image_path;
  }

  // Function : get_logout_error_message
  // Argument : none
  // response : message json of logout error
  get_logout_error_message() {
    return Message_Comm_Func.response_400_C0002();
  }

  // Function : get_nodata_message
  // Argument : none
  // response : message json of logout error
  get_nodata_message() {
    return Message_Comm_Func.response_400_C0003();
  }

  // Function : get_sever_error_message
  // Argument : none
  // response : message json of logout error
  get_sever_error_message() {
    return Message_Comm_Func.response_400_C0004();
  }

  // Function : get_parameter_error_message
  // Argument : none
  // response : message json of logout error
  get_parameter_error_message() {
    return Message_Comm_Func.response_400_C0005();
  }

};

// Function : get_confing_information
// Argument : none
// response : config by every environment
function get_confing_information() {
  const config = fs.readFileSync("/work/common/config/api.config.json", { encoding: "utf-8" });
  const json_config = JSON.parse(config);
  if (process.env.NODE_ENV === 'development') {
    return json_config.development;
  } else {
    return json_config.production;
  }
}

// Function : execute_get_api
// Argument : api_url   / URL for api
//          : parameter / parameter for api
//          : apikey    / apikey for inside of header
//          : secretkey / apikey for inside of secret
//          : callback  / callback function for result (need 3 argument)
// response : none, execute callback function after all
function execute_get_api(api_url, parameter, api_key, secret_key, callback) {
  // HTTP header
  let headers = {
    'Content-Type': 'application/json'
  };

  if (api_key !== undefined && secret_key !== undefined) {
    headers = {
      'Content-Type': 'application/json',
      'apikey': api_key,
      'secretkey': secret_key
    };
  }

  let api_url_parameter = api_url;
  if (parameter !== null) {
    api_url_parameter = api_url + parameter;
  }

  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  // execute get api
  webclient.get({
    url: api_url_parameter,
    headers: headers
  }, function (error, response, body) {
    if (error !== null || response.statusCode !== 200) {
      if (response.body !== undefined && response.body !== null) {
        callback(JSON.parse(response.body), null, null)
      } else {
        // unknown error
        let code = Message_Comm_Func.response_400_C0004();
        callback(code, null, null);
      }
      return
    } else {
      callback(null, response, body);
    }
  });
}

// Function : execute_post_api
// Argument : api_url   / URL for api
//          : parameter / parameter for api
//          : apikey    / apikey for inside of header
//          : secretkey / apikey for inside of secret
//          : callback  / callback function for result (need 3 argument)
// response : none, execute callback function after all
function execute_post_api(api_url, parameter, api_key, secret_key, callback) {
  // HTTP header
  let headers = {
    'Content-Type': 'application/json'
  };

  if (api_key !== undefined && secret_key !== undefined) {
    headers = {
      'Content-Type': 'application/json',
      'apikey': api_key,
      'secretkey': secret_key
    };
  }

  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  // execute post api
  webclient.post({
    uri: api_url,
    method: "POST",
    headers: headers,
    json: true,
    body: parameter
  }, function (error, response, body) {
    if (error !== null || response.statusCode !== 200) {
      if (response.body !== undefined || response.body !== null) {
        callback(response.body, null, null)
      } else {
        // unknown error
        let code = Message_Comm_Func.response_400_C0004();
        callback(code, null, null);
      }
      return
    } else {
      callback(null, response, body);
      return;
    }
  });
}

// Function : execute_form_post
// Argument : form      / form object
//          : host      / host
//          : path      / form url path
//          : apikey    / apikey for inside of header
//          : secretkey / apikey for inside of secret
//          : callback  / callback function for result (need 2 argument)
// response : none, execute callback function after all
function execute_form_post(form_data, form_url, api_key, secret_key, callback) {

  // HTTP header
  let headers = {
    'Content-Type': 'multipart/form-data'
  };

  if (api_key !== undefined && secret_key !== undefined) {
    headers = {
      'Content-Type': 'multipart/form-data',
      'apikey': api_key,
      'secretkey': secret_key
    };
  }

  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  // execute submit
  webclient.post(
    { url: form_url, headers: headers, formData: form_data },
    (error, response, body) => {
      if (error !== null || response.statusCode !== 200) {
        if (response.body !== undefined && response.body !== null) {
          callback(JSON.parse(response.body), null, null)
        } else {
          // unknown error
          let code = Message_Comm_Func.response_400_C0004();
          callback(code, null, null);
        }
        return
      } else {
        callback(null, response, body);
        return;
      }
    }
  );
  return;
}

module.exports = Web_Server_Util;
