'use strict';
let fs = require('fs');
require('date-utils');
let api_conf = JSON.parse(fs.readFileSync("/work/common/config/api.config.json", "utf8"));
const LOG_FLAG = api_conf.api_log_output;

class Logs_Common {

  // Function : consolelog
  // Argument : text to output for console.log()
  // response : none
  // memo     : wrapper function of console.log()
  consolelog(text) {
    if (LOG_FLAG) {
      console.log(text);
    }
  }

  output_log(log_content, pretext, name) {
    if (LOG_FLAG) {
      let now = new Date();
      let dt = now.toFormat('YYYYMMDDHH24MISS');
      let output = log_content;
      // check json
      if (is_json(output)) {
        output = JSON.stringify(log_content);
      }
      fs.appendFileSync("/work/logs/" + name + ".log", "[" + pretext + "] " + dt + " : " + output + "\n");
    }
  }

  output_error_log(error, name) {
    if (LOG_FLAG) {
      let now = new Date();
      let dt = now.toFormat('YYYYMMDDHH24MISS');
      let output = error;
      // check json
      if (is_json(output)) {
        output = JSON.stringify(error);
      }
      fs.appendFileSync("/work/logs/" + name + "_error.log", dt + " : " + output + "\n");
    }
  }
}

const is_json = (value) => {
  try {
    JSON.parse(value)
  } catch (e) {
    return false
  }
  return true
};

module.exports = Logs_Common;
