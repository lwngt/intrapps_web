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
  create_modal('ユーザー削除', 'このユーザーを削除してよろしいですか？', '実行', callback);
};

var set_reset_user_password_modal = (callback) => {
  create_modal('ユーザーパスワードリセット', 'パスワードをリセットしてよろしいですか？', '実行', callback);
};

var set_save_user_information_modal = (callback) => {
  create_modal('ユーザーデータ保存', '保存してよろしいですか？', '実行', callback);
};

var execute_delete_projects = (callback) => {
  create_modal('プロジェクト削除', '選択したプロジェクトを削除してよろしいですか？', '実行', callback);
}

var execute_cancel_contract = (callback) => {
  create_modal('契約解除', '全てのデータは削除されます。契約を解除してよろしいですか？', '実行', callback);
}

var fail_add_project = (item) => {
  if (item === 'image') {
    create_modal('failed to add project', 'Number of image is up to 5.', 'close', null);
  }
}

var fail_add_build = (item) => {
  create_modal('failed to add application', 'set ipa or apk file', 'close', null);
}

var execute_add_project = (callback) => {
  create_modal('プロジェクト保存', 'プロジェクトを保存します。よろしいですか？', '実行', callback);
}

var execute_edit_project = (callback) => {
  create_modal('プロジェクト保存', 'プロジェクトを保存します。よろしいですか？', '実行', callback);
}

var execute_delete_project = (callback) => {
  create_modal('プロジェクト削除', 'プロジェクトを削除します。関連するアプリも削除されます。よろしいですか？', '実行', callback);
}

var execute_update_build = (callback) => {
  create_modal('save the app', 'Are you sure you update the imformation?', 'execute', callback);
};

var execute_add_build = (callback) => {
  create_modal('save the app', 'Are you sure you add the application ?', 'execute', callback);
};

var execute_delete_build = (callback) => {
  create_modal('アプリ削除', 'アプリを削除してよろしいですか？', '実行', callback);
}

var failed_add_comment = () => {
  create_modal('コメント保存', 'コメントの保存に失敗しました', '実行', null);
};

var execute_add_comment = (callback) => {
  create_modal('コメント保存', 'コメントを保存します。よろしいですか？', '実行', callback);
}

var execute_delete_comment = (callback) => {
  create_modal('コメント削除', 'コメントを削除します。よろしいですか？', '実行', callback);
};

var execute_signup = (callback) => {
  create_modal('ユーザー登録', 'ユーザー登録を行います。よろしいですか？', '実行', callback);
};

var execute_confirm = (callback) => {
  create_modal('ユーザー登録', '検証コードの確認を行います。よろしいですか？', '実行', callback);
};

var failed_execute_confirm = () => {
  create_modal('ユーザー登録', '入力にエラーがあります。', '閉じる', null);
};

var execute_save_vendor = (callback) => {
  create_modal('Edit vendor', 'Do you save vendor information?', 'ok', callback);
};

var execute_delete_vendor = (callback) => {
  create_modal('Delete vendor', 'This vendor\'s data is completely deleted.\n Are you sure you delete vendor?', 'ok', callback);
};

var not_to_download_application = () => {
  create_modal('アプリダウンロード', 'このアプリはダウンロードを停止しています。', '閉じる', null);
};

var remove_modal = () => {
  $('.modal-backdrop').remove();
  $('#myModal').modal('hide');
};

var get_file_extension = (filename) => {
  return filename.split('.').pop();
}

var show_circle_loading = () => {
  $("#overlay").fadeIn(300);
}

var delete_circle_loading = () => {
  $("#overlay").fadeOut(300);
}


