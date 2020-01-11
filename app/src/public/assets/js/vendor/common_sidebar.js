// side bar
// CAUTION !! : never delete sidebar-build, sidebar-project, sidebar-admin
var sidebar_id_list = [
  '#sidebar-build',
  '#sidebar-project',
  "#sidebar-project-collapse",
  "#sidebar-admin",
  "#sidebar-admin-collapse",
  '#sidebar-project-all',
  "#sidebar-user-management",
  "#sidebar-project-management"
];

var change_class = (id, array) => {
  let activation = false;
  array.forEach((element, index, array) => {
    if (element === id) {
      // set active
      $(element).addClass('active');
      // save setting
      save_highlight_setting(id);
      activation = true;
    } else {
      // clear active
      $(element).removeClass('active');
    }
  });
  // never set highlight
  if (activation === false) {
    // set active
    $(id).addClass('active');
    // save setting
    save_highlight_setting(id);
  }
};

var clear_toggle_open_setting = () => {
  $('#project_list').removeClass("show");
  $('#management_list').removeClass("show");
};

var set_toggle_open_setting = (set_show_toggle_class) => {
  // open setting
  let class_name = "#" + set_show_toggle_class;
  $(class_name).addClass("show");
  let parent_id = "#" + $(class_name).parent().attr("id") + "-collapse";
  $(parent_id).attr({ "aria-expanded": true });
  save_toggle_setting(class_name);
};

var clear_save_toggle_and_highlight_setting = () => {
  localStorage.removeItem("toggle");
  localStorage.removeItem("lighlight");
};

var save_toggle_setting = (save) => {
  localStorage.setItem("toggle", save);
};

var save_highlight_setting = (save) => {
  localStorage.setItem("lighlight", save);
};

var set_highlight_sidebar = (set_show_toggle_class, set_highlight_class) => {
  // clear setting in localstrage
  clear_save_toggle_and_highlight_setting();

  // close toggle
  clear_toggle_open_setting();

  // open toggle
  if (set_show_toggle_class !== null) {
    // open setting
    set_toggle_open_setting(set_show_toggle_class);
  }

  // set highlight
  change_class('#' + set_highlight_class, sidebar_id_list);
};

var inherit_sidebar_setting = () => {
  let toggle_setting = localStorage.getItem("toggle"); // there is possible null is returned.
  if (toggle_setting !== null) {
    // delete 1st character of '#
    toggle_setting = toggle_setting.slice(1);
  }
  let lighlight_setting = localStorage.getItem("lighlight"); // there is "no" possible null is returned.
  if (lighlight_setting !== null) {
    // delete 1st character of '#
    lighlight_setting = lighlight_setting.slice(1);
  }

  // set toggle and lighlight
  set_highlight_sidebar(toggle_setting, lighlight_setting);
};

