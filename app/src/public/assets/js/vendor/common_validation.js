var check_validation_result = (element) => {
  if ($(element).closest('.form-group').hasClass('has-danger')) {
    return false;
  } else {
    return true;
  }
};

var reset_validation_result = (element) => {
  $(element).closest('.form-group').removeClass('has-danger');
};

var display_check_error = (error, element) => {
  $(element).closest('.form-group').removeClass('has-success').addClass('has-danger');
  $(element).closest('.form-check').removeClass('has-success').addClass('has-danger');
  $(element).closest('.form-group').append("<label>" + error + "</label>");
};

var display_check_success = (element) => {
  $(element).closest('.form-group').removeClass('has-danger').addClass('has-success');
  $(element).closest('.form-check').removeClass('has-danger').addClass('has-success');

};

var half_size_check_error_comment = 'Please input half-size character.';
var half_size_check = (str) => {
  var reg = new RegExp(/^[0-9a-zA-Z]+$/);
  var res = reg.test(str);
  return res;
}

var password_check_error_comment = 'Not only lower character ,but one and more numeric and upper character are also mandatory.';
var password_check = (str) => {
  var reg = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9]{6,}$/);
  var res = reg.test(str);
  return res;
}

var numeric_error_check_comment = 'Please input only number.';
var numeric_error_check = (str) => {
  var reg = new RegExp(/^(?=.*\d)[0-9]{6,}$/);
  var res = reg.test(str);
  return res;
}

var upload_image_error_comment = "Number of images is up to 5.";
