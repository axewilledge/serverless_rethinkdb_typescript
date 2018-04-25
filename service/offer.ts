import * as _rethinkDB from "rethinkdb";
import * as _async from "async";

import connection from "./db.connection";
var db = new connection(); //CREATE DATABASE CONNECTION OBJECT
db.setupDb(); //INITIAL SETUP OF THE DATABASE AND TABLE


//INTERFACE TO MODEL THE SCHEMA OF THE OFFER
interface offerModel {
  duration: string;
  offer: string;
}

export default class offers {


 //~~~~~~~~~~~~~~~~~FUNCTION TO ADD NEW OFFER~~~~~~~~~~~~~~~~~~~//
    addNewOffer(offerData,callback) {
        _async.waterfall([
          function(callback) {
            db.connectToDb(function(err,connection) {
              if(err) {
                return callback(true,"Error connecting to database");
              }
              callback(null,connection);
            });
          },
          function(connection,callback) {

            const data:offerModel = {
              duration : offerData.duration,
              offer : offerData.offers
            }

            _rethinkDB.table('offer').insert(data).run(connection,function(err,result) {
              connection.close();
              if(err) {
                return callback(true,"Error happens while adding new offers");
              }
              callback(null,result);
            });
          }
        ],function(err,data) {
          callback(err === null ? false : true,data);
        });
      }


//~~~~~~~~~~~~~~~~~FUNCTION TO UPDATE OFFER~~~~~~~~~~~~~~~~~~~//
      updateOffer(param_id,offerData,callback) {
        _async.waterfall([
          function(callback) {
            db.connectToDb(function(err,connection) {
              if(err) {
                return callback(true,"Error connecting to database");
              }
              callback(null,connection);
            });
          },
          function(connection,callback) {

            const data:offerModel = {
              duration : offerData.duration,
              offer : offerData.offers
            }

            _rethinkDB.table('offer').get(param_id).update(data).run(connection,function(err,result) {
                connection.close();
                if(err) {
                  return callback(true,"Error updating the offer");
                }
                callback(null,result);
              });
          }
        ],function(err,data) {
          callback(err === null ? false : true,data);
        });
      }


//~~~~~~~~~~~~~~~~~FUNCTION TO DELETE OFFER~~~~~~~~~~~~~~~~~~~//
      deleteOffer(param_id,callback) {
        _async.waterfall([
          function(callback) {
            db.connectToDb(function(err,connection) {
              if(err) {
                return callback(true,"Error connecting to database");
              }
              callback(null,connection);
            });
          },
          function(connection,callback) {
            _rethinkDB.table('offer').get(param_id).delete().run(connection,function(err,result) {
                connection.close();
                if(err) {
                  return callback(true,"Error deleting the offer");
                }
                callback(null,result);
              });
          }
        ],function(err,data) {
          callback(err === null ? false : true,data);
        });
      }



//~~~~~~~~~~~~~~~~~FUNCTION TO GET ALL OFFERS~~~~~~~~~~~~~~~~~~~//
      getAllOffers(callback) {
        _async.waterfall([
          function(callback) {
            db.connectToDb(function(err,connection) {
              if(err) {
                return callback(true,"Error connecting to database");
              }
              callback(null,connection);
            });
          },
          function(connection,callback) {
            _rethinkDB.table('offer').run(connection,function(err,cursor) {
              connection.close();
              if(err) {
                return callback(true,"Error fetching offers to database");
              }
              cursor.toArray(function(err, result) {
                if(err) {
                  return callback(true,"Error reading cursor");
                }
                callback(null,result);
              });
            });
          }
        ],function(err,data) {
          callback(err === null ? false : true,data);
        });
    }

}