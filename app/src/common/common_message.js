'use strict';

const response = [
  { "status": 400, "code": "C0001", "message": "Error occurred during user registration." },
  { "status": 400, "code": "C0002", "message": "Logout. Please login again." },
  { "status": 400, "code": "C0003", "message": "No data to display" },
  { "status": 400, "code": "C0004", "message": "Error occurred" },
  { "status": 400, "code": "C0005", "message": "Parameter is not correct." },
  { "status": 999, "code": "C0006", "message": "Unknown error" },
];

class Message_Common {

  // Function : response_400_C0001
  // Argument : none
  // response : STATUS:400 & CODE:0001 json
  // memo     : search json meet condition
  response_400_C0001() {
    return search_response_and_code(400, "C0001");
  }

  // Function : response_400_C0002
  // Argument : none
  // response : STATUS:400 & CODE:0002 json
  // memo     : search json meet condition
  response_400_C0002() {
    return search_response_and_code(400, "C0002");
  }

  // Function : response_400_C0003
  // Argument : none
  // response : STATUS:400 & CODE:0003 json
  // memo     : search json meet condition
  response_400_C0003() {
    return search_response_and_code(400, "C0003");
  }

  // Function : response_400_C0004
  // Argument : none
  // response : STATUS:400 & CODE:0004 json
  // memo     : search json meet condition
  response_400_C0004() {
    return search_response_and_code(400, "C0004");
  }

  // Function : response_400_C0005
  // Argument : none
  // response : STATUS:400 & CODE:0005 json
  // memo     : search json meet condition
  response_400_C0005() {
    return search_response_and_code(400, "C0005");
  }

  // Function : response_999_C0006
  // Argument : none
  // response : STATUS:unknown & CODE:0006 json
  // memo     : search json meet condition
  response_999_C0006() {
    return search_response_and_code(999, "C0006");
  }

  // Function : response_object
  // Argument : res      / response object of api
  //          : status   / http stauts to response
  //          : contents / json contents to response
  // response : none
  response_object(res, status, code, data) {
    res.header("Content-Type", "application/json; charset=utf-8");
    res.status(status).json(create_response_json(code, data));
  };
}

// Function : create_response_json
// Argument : create json for response
// response : none
const create_response_json = (code, data) => {
  return {
    "code": code,
    "data": data
  };
};

// Function : search_response_and_code
// Argument : status / equal to response[?].status
// response : json object of response[?]
// memo     : search json meet status and code condition
const search_response_and_code = (status, code) => {
  let response_contents = response[response.length - 1];
  response.filter((value) => {
    if (value.status === status && value.code === code) {
      response_contents = value;
    };
  });
  return response_contents;
};

module.exports = Message_Common;
