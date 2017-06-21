const fs = require('fs');
const readline = require('readline');
const mongodb = require('mongodb');
const {DateStrIterator} = require('./date-utils');

const pathPrefix = './html/scc'
const startDateStr = '20170101';
const endDateStr   = '20170611';
const pathPostfix = '.html';
const regexForIdRate = /(.+)\((.+)\) (.+)\((.+)\) (.+)\((.+)\)<br>/;
const regexForURL = /log=([^"]+)/;

const iterator = new DateStrIterator(startDateStr);

mongodb.MongoClient.connect('mongodb://localhost:27017/tenhou', function(err, db) {
  insert(db);
});

const insert = function(db) {
    const dateStr = iterator.nextStr();
    const col = db.collection('info');
    const readlineInterface = readline.createInterface({
        input: fs.createReadStream(pathPrefix + dateStr + pathPostfix),
        output: null
    });

    readlineInterface.on('line', function(line) {
        const arr = line.split(' | ');
        if (/三鳳/.test(arr[2])) {
            const year = dateStr.substring(0, 4);
            const month = ('0' + dateStr.substring(4, 6)).slice(-2);
            const day = ('0' + dateStr.substring(6, 8)).slice(-2);
            const date = new Date(year + '/' + month + '/' + day
                                    + ' ' + arr[0]);
            const match = arr[4].match(regexForIdRate);
            const info = {
                date: date,
                taku: arr[2].replace(/－/g, ''),
                tenhou_ids: JSON.stringify([match[1], match[3], match[5]]),
                scores: JSON.stringify([match[2], match[4], match[6]]),
                time: parseInt(arr[1]),
                mjlog: arr[3].match(regexForURL)[1]
            };
            col.insertOne(info);
        }
    });

    readlineInterface.on('close', function() {
        console.log('import: ' + pathPrefix + dateStr + pathPostfix)
        if (dateStr === endDateStr) {
            db.close();
        } else {
            insert(db);
        }
    });
}