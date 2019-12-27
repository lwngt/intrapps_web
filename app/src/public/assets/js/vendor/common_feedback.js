type = ['primary', 'info', 'success', 'warning', 'danger'];

var feedback = {
  show_notification: function (from, align, type_number, message) {
    $.notify({
      icon: "nc-icon nc-bell-55",
      message: message
    }, {
      type: type[type_number],
      timer: 1000,
      placement: {
        from: from,
        align: align
      }
    });
  }
};
