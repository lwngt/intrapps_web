
var datatables_setting = {
  initialize_for_applist_in_project: function (id) {
    let data = {
      "lengthChange": false,
      "pageLength": 10,
      "scrollY": true,
      "scrollCollapse": true,
      "stateSave": true,
      "ordering": true,
      "lengthMenu": [
        [10, 25, 50, "All"]
      ],
      columnDefs: [
        { targets: 0, width: 10 },
        { targets: 2, width: 10 },
        { targets: 3, width: 100 },
        { targets: 6, width: 110 },
        { targets: 7, width: 50 }
      ],
      "responsive": true
    };
    $(id).DataTable(data);
  },
  initialize_for_projectlist_in_projects: function (id) {
    let data = {
      "lengthChange": false,
      "pageLength": 10,
      "scrollY": true,
      "scrollCollapse": true,
      "stateSave": true,
      "ordering": true,
      "lengthMenu": [
        [10, 25, 50, "All"]
      ],
      "responsive": true
    };
    $(id).DataTable(data);
  },
  initialize_for_projectlist_in_user_add: function (id) {
    let data = {
      "lengthChange": false,
      "pageLength": 10,
      "scrollY": true,
      "scrollCollapse": true,
      "stateSave": true,
      "ordering": true,
      "lengthMenu": [
        [10, 25, 50, "All"]
      ],
      "responsive": true
    };
    $(id).DataTable(data);
  },
  initialize_for_userlist_in_users: function (id) {
    let data = {
      "lengthChange": false,
      "pageLength": 10,
      "scrollY": true,
      "scrollCollapse": true,
      "stateSave": true,
      "ordering": true,
      "lengthMenu": [
        [10, 25, 50, "All"]
      ],
      "responsive": true
    };
    $(id).DataTable(data);
  }
};
