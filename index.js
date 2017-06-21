const request = require('request');
const fs = require('fs');
const zlib = require('zlib');
const mongodb = require('mongodb');

const playerName = 'お知らせ';
const playerNameRegex = new RegExp(playerName);

// const urlPrefix = "http://tenhou.net/0/log/?";
// const filePostfix1 = '&tw='
// const filePostfix2 = '.mjlog';

// const gzip = zlib.createGzip();
// const outfile = fs.createWriteStream("./mjlog/" + id + filePostfix1 + '1' + filePostfix2);

// request(urlPrefix + id).pipe(gzip).pipe(outfile);

mongodb.MongoClient.connect('mongodb://localhost:27017/tenhou', function(err, db) {
  exec(db);
});

const exec = function(db) {
    const col = db.collection('info');
    col.find({tenhou_ids: playerNameRegex}, function(err, infos) {
      infos.each(function(err, info) {
        if (info) console.log(info.tenhou_ids);
      });
    });
    db.close();
}














// var MongoClient = require("mongodb").MongoClient

// // move connecting to mongo logic into a function to avoid the "pyramid of doom"
// function getConnection(cb) {  
//     MongoClient.connect("your-mongo-url", function(err, db) {
//         if (err) return cb(err);
//         var accounts = db.collection("accounts");
//         cb(null, accounts);
//     })
// }    
// // list all of the documents by passing an empty selector.
// // This returns a 'cursor' which allows you to walk through the documents
// function readAll(collection, cb) {  
//    collection.find({}, cb);
// }

// function printAccount(account) {  
//     // make sure you found your account!
//     if (!account) {
//         console.log("Couldn't find the account you asked for!");
//     }
//     console.log("Account from Array "+ account);
// }

// // the each method allows you to walk through the result set, 
// // notice the callback, as every time the callback
// // is called, there is another chance of an error
// function printAccounts(accounts, cb) {  
//     accounts.each(function(err, account) {
//         if (err) return cb(err);
//         printAccount(account);
//     });
// }

// function get_accounts(cb) {  
//     getConnection(function(err, collection) {
//         if (err) return cb(err);    
//         // need to make sure to close the database, otherwise the process
//         // won't stop
//         function processAccounts(err, accounts) {
//             if (err) return cb(err);
//             // the callback to each is called for every result, 
//             // once it returns a null, you know
//             // the result set is done
//             accounts.each(function(err, account) {
//                 if (err) return cb(err)  
//                 if (hero) {  
//                     printAccount(account);
//                 } else {
//                     collection.db.close();
//                     cb();
//                 }
//             })
//         }
//         readAll(collection, processAccounts);        
//     })
// }

// // Call the get_accounts function
// get_accounts(function(err) {  
//      if (err) {
//          console.log("had an error!", err);
//          process.exit(1);
//      }
// });