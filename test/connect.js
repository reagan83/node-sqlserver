// connect.js
// test suite for connections

var sql = require('../');
var assert = require( 'assert' );
var config = require( './test-config' );

suite( 'open', function() {

    test('trusted connection to a server', function( done ) {

//        sql.open( "Driver={SQL Server Native Client 11.0};Initial Catalog=aedb;Server=" + config.server + ";User Id=" + config.user + ";Password=" + config.password + ";", 
        sql.open( "Driver={SQL Server Native Client 11.0};Initial Catalog=aedb;Server=g360pm2010;UID=aedb;PWD=aedb;", 
                  function( err, conn ) {

                      assert.ifError( err );
                      assert( typeof conn == 'object');

                      done();
                  });
    });
});

