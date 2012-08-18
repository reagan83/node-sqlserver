var http = require('http');
var sql = require('../');

var conn_str = "Driver={SQL Server Native Client 11.0};Initial Catalog=aedb;Server=g360pm2010;UID=aedb;PWD=aedb;";

http.createServer(function (req, res) {
  var pathname = require('url').parse(req.url).pathname;

  if (pathname == '/favicon.ico') {
    // do nothing
    return;
  }

  console.log("Url: %s", req.url);

  if (pathname == '/ProcessStatistics/ProcessCompleted') {
    console.log("Process Statistics - Process Completed");

    var pquery = require('querystring').parse(require('querystring').parse(req.url).query);   
    var callback = (pquery.callback ? pquery.callback : '');

    var returnObject = '[{"x": 3, "y": 6}, {"x": 8, "y": 2}, {"x": 1, "y": 5}, {"x": 4, "y": 2}]';
    var returnObjectString = JSON.stringify(returnObject);

    res.writeHead(200, {'Content-Type': 'application/javascript'});
    res.end("_testcb(\'" + returnObjectString + "\')");
  }
  else if (pathname == '/query/ActivityStatistics') {
    console.log("ActivityStatistics URL");

    //var filterParticipantName = '%York%';
    var test = '';
    //sql.query(conn_str, "SELECT count(1) FROM AEDB.dbo.F_ActivityStatistics WHERE ParticipantDisplayName LIKE ?", [ParticipantDisplayName], function (err, results) {
    sql.query(conn_str, "SELECT * FROM OPENQUERY(AEOLAP, 'SELECT [Measures].[Activity Backlog] ON 0 FROM [Activity Statistics]')", [null], function (err, results) {

        if (err) {
            console.log("Error executing query: %s", err);
        }

        res.end(JSON.stringify(results));
    });

  }
  else if (pathname == '/query') {
    var qs = require('url').parse(req.url).query;
    var qsJSON = require('querystring').parse(qs);

    console.log("Parsed: %j", qsJSON);
    res.end();
  }
  else {
    res.end("Not supported.");
  }

}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');

