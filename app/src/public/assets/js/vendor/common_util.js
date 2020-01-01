let two_button_tag_previous_name = '<div id="modal-two-button" class="modal-footer">'
  + '<div class="left-side">'
  + '  <button type="button" class="btn btn-default btn-link" data-dismiss="modal">close</button>'
  + '</div>'
  + '<div class="divider"></div>'
  + '<div class="right-side">'
  + '  <button type="button" class="btn btn-danger btn-link execute-button" data-dismiss="modal">'
let two_button_tag_after_name = '</button>'
  + '</div>'
  + '</div>';

let one_button_tag = '<div id="modal-one-button" class="modal-footer justify-content-center">'
  + '  <button type="button" class="btn btn-default btn-link" data-dismiss="modal">close</button>'
  + '</div>';

var create_modal = (title, body, button_name, button_callback) => {
  // set title text
  $('.title').text(title);
  // set body text
  $('.body').text(body);
  // set execute button text
  $('.execute-button').text(button_name);
  // execute button callback
  $('#controll-modal-button').empty();
  if (button_callback !== null) {
    let two_button_tag = two_button_tag_previous_name + button_name + two_button_tag_after_name;
    $('#controll-modal-button').append(two_button_tag);
    $('.execute-button').click(button_callback);
  } else {
    $('#controll-modal-button').append(one_button_tag);
  }
};

var set_delete_user_modal = (callback) => {
  create_modal('Delete user', 'Are you sure you want to delete this user?', 'execute', callback);
};

var set_reset_user_password_modal = (callback) => {
  create_modal('Reset password', 'Are you sure you want to reset the password?', 'execute', callback);
};

var set_save_user_information_modal = (callback) => {
  create_modal('Save user\'s data', 'Are you sure you want to save?', 'execute', callback);
};

var execute_delete_projects = (callback) => {
  create_modal('Delete the project', 'Are you sure you want to delete this project?', 'execute', callback);
}

var execute_cancel_contract = (callback) => {
  create_modal('Delete all the vendor\'s data', 'You can delete all the vendor\'s data. Are you sure you want to delete all data?', 'execute', callback);
}

var fail_add_project = (item) => {
  if (item === 'image') {
    create_modal('failed to add project', 'Number of image is up to 5.', 'close', null);
  } else if (item === 'name') {
    create_modal('failed to add project', 'Project name is mandatory', 'close', null);
  }
}

var fail_add_build = (item) => {
  create_modal('failed to add application', 'set ipa or apk file', 'close', null);
}

var execute_add_project = (callback) => {
  create_modal('Add the project', 'You can add project for apps. Are you sure you want to add?', 'execute', callback);
}

var execute_edit_project = (callback) => {
  create_modal('Save the project', 'You can save the project setting. Are you sure you want to save?', 'execute', callback);
}

var execute_delete_project = (callback) => {
  create_modal('Delete the project', 'You can delete the project. Are you sure you want to delete?', 'execute', callback);
}

var execute_update_build = (callback) => {
  create_modal('save the app', 'Are you sure you update the imformation?', 'execute', callback);
};

var execute_add_build = (callback) => {
  create_modal('Add the app', 'Are you sure you add the application?', 'execute', callback);
};

var execute_delete_build = (callback) => {
  create_modal('Delete the app', 'Are you sure you delete the application?', 'execute', callback);
}

var failed_add_comment = () => {
  create_modal('Failed to save the comment', 'You failed to save the comment.', 'ok', null);
};

var execute_add_comment = (callback) => {
  create_modal('Save the comment', 'Are you sure you want to save the comment?', 'execute', callback);
}

var execute_delete_comment = (callback) => {
  create_modal('Delete the comment', 'Are you sure you want to delete the comment?', 'execute', callback);
};

var execute_signup = (callback) => {
  create_modal('sign up the user', 'Perform user registration. Is it OK?', 'execute', callback);
};

var execute_confirm = (callback) => {
  create_modal('sign up the user', 'Confirm verification code. Is it OK?', 'execute', callback);
};

var failed_execute_confirm = () => {
  create_modal('sign up the user', 'There are some error in registration.', 'ok', null);
};

var execute_save_vendor = (callback) => {
  create_modal('Edit vendor', 'Do you save vendor information?', 'ok', callback);
};

var execute_delete_vendor = (callback) => {
  create_modal('Delete vendor', 'This vendor\'s data is completely deleted.\n Are you sure you delete vendor?', 'ok', callback);
};

var not_to_download_application = () => {
  create_modal('Stop downloading', 'This app has stopped downloading.', 'close', null);
};

var failed_to_install_ipa_file = () => {
  create_modal('Fail to install', 'You have to use mobile-Safari of ios when you install ios app.', 'close', null);
};

var remove_modal = () => {
  $('.modal-backdrop').remove();
  $('#myModal').modal('hide');
};

var get_file_extension = (filename) => {
  return filename.split('.').pop();
};

var show_circle_loading = () => {
  $("#overlay").fadeIn(300);
};

var delete_circle_loading = () => {
  $("#overlay").fadeOut(300);
};

var check_ios_browser = () => {
  let user_agent = window.navigator.userAgent.toLowerCase();
  if ((user_agent.indexOf('iphone') !== -1
    || user_agent.indexOf('ipad') !== -1)
    && user_agent.indexOf('safari') !== -1) {
    // iphone or ipad must use safari
    return true;
  } else {
    return false;
  }
};

var check_android_browser = () => {
  let user_agent = window.navigator.userAgent.toLowerCase();
  if (user_agent.indexOf('android') !== -1
    && user_agent.indexOf('mobile') !== -1) {
    return true;
  } else {
    return false;
  }
}
