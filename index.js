const request = require('request');
const fs = require('fs');
const zlib = require('zlib');
const mongoose = require('mongoose');

const {Readable} = require('stream');
const {Info} = require('./model');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/tenhou');

const heroName = 'CrazyZZZ';
const heroNameRegex = new RegExp(heroName);

const playerRegex = /n\d="[^"]+"/g;
const positionRegex = /n(\d)="([^"]+)"/;

const urlPrefix = "http://tenhou.net/0/log/?";
const filePostfix1 = '&tw='
const filePostfix2 = '.mjlog';

Info.find({tenhou_ids: heroNameRegex}, function(err, infos) {
  download(infos, 0);
});

const download = function(infos, idx) {
  request(urlPrefix + infos[idx].mjlog, function(err, res, data) {
    let position;
    data.match(playerRegex).forEach(function(xml) {
      const positionMatch = xml.match(positionRegex);
      if (heroName === decodeURI(positionMatch[2])) {
        position = positionMatch[1];
      }
    });

    if (position) {
      const gzip = zlib.createGzip();
      const path = "./mjlog/" + infos[idx].mjlog + filePostfix1 + position + filePostfix2
      const outfile = fs.createWriteStream(path);

      const stream = new Readable();
      stream.push(data);
      stream.push(null);

      stream.pipe(gzip).pipe(outfile);
      console.log('download: ' + path);
    }
  });

  if (idx === infos.length - 1) {
    mongoose.disconnect();
  } else {
    setTimeout(function() {
      download(infos, idx + 1);
    }, 2000);
  }
};














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