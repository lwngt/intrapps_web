var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var signupRouter = require('./routes/signup');
var signupExecuteRouter = require('./routes/signup_execute');
var dashboardRouter = require('./routes/dashboard');
var confirmRouter = require('./routes/confirm');
var confirmExecuteRouter = require('./routes/confirm_execute');
var loginRouter = require('./routes/login');
var loginExecuteRouter = require('./routes/login_execute');
var logout_router = require('./routes/logout');

var report_add_router = require('./routes/report_add');
var report_add_execute_router = require('./routes/report_add_execute');
var reportEditRouter = require('./routes/report_edit');
var reportEditExecuteRouter = require('./routes/report_edit_execute');
var reportDeleteExecuteRouter = require('./routes/report_delete_execute');

var buildRouter = require('./routes/build');
var buildAddRouter = require('./routes/build_add');
var buildAddExecuteRouter = require('./routes/build_add_execute');
var buildEditRouter = require('./routes/build_edit');
var buildEditExecuteRouter = require('./routes/build_edit_execute');
var build_delete_execute_router = require('./routes/build_delete_execute');

var projectsRouter = require('./routes/projects');
var projectAddRouter = require('./routes/project_add');
var projectAddExecuteRouter = require('./routes/project_add_execute');
var projectRouter = require('./routes/project');
var projectEditRouter = require('./routes/project_edit');
var projectEditExecuteRouter = require('./routes/project_edit_execute');
var projectDeleteExecuteRouter = require('./routes/project_delete_execute');

var user_router = require('./routes/user');
var users_router = require('./routes/users');
var user_add_router = require('./routes/user_add');
var user_add_execute_router = require('./routes/user_add_execute');
var user_edit_execute_router = require('./routes/user_edit_execute');
var user_delete_execute_router = require('./routes/user_delete_execute');

var vendor_router = require('./routes/vendor');
var vendor_edit_execute_router = require('./routes/vendor_edit_execute');
var vendor_delete_execute_router = require('./routes/vendor_delete_execute');

var app = express();

// session
var session_secure = false;
var session_maxage = 1000 * 60 * 3600;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'intrapps_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: session_secure,
    maxAge: session_maxage
  }
}));

//  add htm,html of extension for ejs template engine
app.engine('html', require('ejs').renderFile);
app.engine('ejs', require('ejs').renderFile);

// signup
app.use('/signup', signupRouter);
app.use('/signup_execute', signupExecuteRouter);
app.use('/confirm', confirmRouter);
app.use('/confirm_execute', confirmExecuteRouter);

// login
app.use('/login', loginRouter);
app.use('/login_execute', loginExecuteRouter);

// logout
app.use('/logout', logout_router);

// top
app.use('/', dashboardRouter);
app.use('/dashboard', dashboardRouter);

// report
app.use('/report_add', report_add_router);
app.use('/report_add_execute', report_add_execute_router);
app.use('/report_edit', reportEditRouter);
app.use('/report_edit_execute', reportEditExecuteRouter);
app.use('/report_delete_execute', reportDeleteExecuteRouter);

// building
app.use('/build', buildRouter);
app.use('/build_add', buildAddRouter);
app.use('/build_add_execute', buildAddExecuteRouter);
app.use('/build_edit', buildEditRouter);
app.use('/build_edit_execute', buildEditExecuteRouter);
app.use('/build_delete_execute', build_delete_execute_router);

// projects
app.use('/project', projectRouter);
app.use('/projects', projectsRouter);
app.use('/project_add', projectAddRouter);
app.use('/project_add_execute', projectAddExecuteRouter);
app.use('/project_edit', projectEditRouter);
app.use('/project_edit_execute', projectEditExecuteRouter);
app.use('/project_delete_execute', projectDeleteExecuteRouter);

// management
app.use('/user', user_router);
app.use('/users', users_router);
app.use('/user_add', user_add_router);
app.use('/user_add_execute', user_add_execute_router);
app.use('/user_edit_execute', user_edit_execute_router);
app.use('/user_delete_execute', user_delete_execute_router);

app.use('/vendor', vendor_router);
app.use('/vendor_edit_execute', vendor_edit_execute_router);
app.use('/vendor_delete_execute', vendor_delete_execute_router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err.stack);
  if (err.status === 404) {
    res.render('404.ejs');
    return;
  } else {
    res.render('error.ejs');
    return;
  }

});

module.exports = app;
