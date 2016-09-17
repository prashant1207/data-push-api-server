var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var json = require('json');
var body = require('body-parser');
var constants = require('./helper/constants.js');
var _util = require('./helper/utils.js');
var util = new _util(true);

app.use(body.urlencoded({ extended: false }));
app.use(body.json());
app.use(express.static('public'));

/*
  Summary:
  All request goes through this.
  Validation for all endpoint hit. Also can be used to initiate access logging.
  Params: 
  value = filename for image resource.
*/

app.all('*',function(req,res,next){
  if (authValidator(req, false)) {
    next();
  }
  else{
    sendError("invalid_auth", res);
  }
})

app.get('/', function (req, res) {
  res.status('200').send(constants.welcomeMessage);
})

/*
  Summary:
  For Sending Out Image Resource
  Params: 
  value = filename for image resource.
*/
app.get('/icon/:value?', function (req, res) {
  try {
    res.sendFile(__dirname + req.originalUrl);
  }
  catch (e) {
    util.error(e);
    res.sendFile(__dirname + "/icon/block.png");
  }
})


/*
  Summary:
  For sending out JSON content with reespect to requested content_id
  Params: 
  content_id = Content Id associated with config response.

  Success:
  Returns JSON content of the requested resource.

  Failure:
  Returns error if content_id is invalid.
*/
app.get('/content', function (req, res) {
  try {
    if (authValidator(req, false)) {
      var fileName = req.query.content_id;
      if (filename != null) {
        res.sendFile(__dirname + "/json/data/" + fileName + ".json");
      }
      else {
        sendError(null, res);
      }

    }
    else {
      sendError("invalid_auth", res);
    }
  }
  catch (e) {
    util.error("Error in /content: " + e);
    sendError(null, res);
  }

})


/*
  Summary:
  Save 'application/json' content which is POST from the client
  Expected properties needs to defined.
  Success:
  Returns Success status.

  Failure:
  Returns Error status.
*/
app.post('/save', function (req, res) {
  try {
      var id = req.body.id;
      var message = req.body.message;
      var message_id=util.getUNIXTimestamp();
      if (id == null || message == null) {
        sendError(null, res);
      }
      else {
        saveToFile("ID: " + id + " Message:" + message, message_id);
        res.status('200').send('{"status":"success","reference":"' + message_id + '"}');
      }
  }
  catch (e) {
    util.error("Error in /save: " + e);
    sendError(null, res);
  }

});

/*
  Summary:
  Send initial config, which intentionally defines client structure, content_ids to fetch
  Success:
  Returns Success status.

  Failure:
  Returns Error status.
*/

app.get('/config', function (req, res) {
  try {
    res.sendFile(__dirname + "/json/config.json");
  }
  catch (e) {
    util.error("Error in /config: " + e);
    sendError(null, res);
  }
})

function saveToFile(message, filename) {
  fs.writeFile(filename + ".txt", message, 'utf8', function (err) {
    if (err) {
      util.error("File Creation Failed: [" + filename + "]" + err);
    }
    else {
      //File Created
      util.info("File Created:" + filename);
    }
  });
}

function sendError(type, res) {
  switch (type) {
    case "invalid_auth":
      res.status('200').send('{"status":"invalid_auth"}');
      break;
    case "general_error":
      res.status('200').send('{"status":"general_error"}');
      break;
    default:
      res.status('200').send('{"status":"error"}');
      break;
  }
}

function authValidator(req, IsPost) {
  var IsSuccess = true;
  /*
    Define your auth validation for request.
  */
  util.info('Auth Validation For IP ' + util.getIP(req) + " :" + IsSuccess + " requested for endpoint " + req.originalUrl);
  return IsSuccess;
}

/*
  Summary:
  Initiate server with Constants Port.
*/
var server = app.listen(constants.port, function () {
  var host = server.address().address
  var port = server.address().port
  util.logHostSystemInfo();
  util.log(constants.consoleStartUpMessage + port, null);
})