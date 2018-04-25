import  * as _rethinkDB  from "rethinkdb";
import * as _async from "async";

export default class rethinkDB {

//~~~~~~~~~~~~~~~~~SET UP THE DATABASE WITH TABLES~~~~~~~~~~~~~~~~~~~//
  setupDb(callback) {
    var self = this;
    _async.waterfall([
      function(callback) {
        self.connectToRethinkDbServer(function(err,connection) {
          if(err) {
            return callback(true,"Error in connecting RethinkDB");
          }
          callback(null,connection);
        });
      },
      function(connection,callback) {
        _rethinkDB.dbCreate('sampleRethink').run(connection,function(err, result) {
          if(err) {
            console.log("Database already created");
          } else {
            console.log("Created new database");
          }
          callback(null,connection);
        });
      },
      function(connection,callback) {
        _rethinkDB.db('sampleRethink').tableCreate('offer').run(connection,function(err,result) {
          connection.close();
          if(err) {
            console.log("table already created");
          } else {
            console.log("Created new table");
          }
          callback(null,"Database is setup successfully");
        });
      }
    ],function(err,data) {
      console.log(data);
      callback(err === null ? false : true,data);
    });
  }

  connectToRethinkDbServer(callback) {
    _rethinkDB.connect({
      host : 'localhost',
      port : 28015
    }, function(err,connection) {
      callback(err,connection);
    });
  }

// ~~~~~~~~~~~~~~~~~FUNCTION TO CONNECT DATABASE~~~~~~~~~~~~~~~~~~//

  connectToDb(callback) {
    _rethinkDB.connect({
      host : 'localhost',
      port : 28015,
      db : 'sampleRethink'
    }, function(err,connection) {
      callback(err,connection);
    });
  }
}