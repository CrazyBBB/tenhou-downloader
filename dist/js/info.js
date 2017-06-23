"use strict";
exports.__esModule = true;
var fs = require("fs");
var readline = require("readline");
var date_utils_1 = require("./date-utils");
var model_1 = require("./model");
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/tenhou');
var startDateStr = process.argv[2];
var endDateStr = process.argv[3];
var pathPrefix = './html/scc';
var pathPostfix = '.html';
var regexForIdRate = /(.+)\((.+)\) (.+)\((.+)\) (.+)\((.+)\)<br>/;
var regexForURL = /log=([^"]+)/;
var iterator = new date_utils_1.DateStrIterator(startDateStr);
(function insert() {
    var dateStr = iterator.nextStr();
    var readlineInterface = readline.createInterface({
        input: fs.createReadStream(pathPrefix + dateStr + pathPostfix),
        output: undefined
    });
    readlineInterface.on('line', function (line) {
        var arr = line.split(' | ');
        if (/三鳳/.test(arr[2])) {
            var year = dateStr.substring(0, 4);
            var month = ('0' + dateStr.substring(4, 6)).slice(-2);
            var day = ('0' + dateStr.substring(6, 8)).slice(-2);
            var date = new Date(year + '/' + month + '/' + day
                + ' ' + arr[0]);
            var match = arr[4].match(regexForIdRate);
            var info = new model_1.Info({
                date: date,
                taku: arr[2].replace(/－/g, ''),
                tenhou_ids: JSON.stringify([match[1], match[3], match[5]]),
                scores: JSON.stringify([match[2], match[4], match[6]]),
                time: parseInt(arr[1]),
                mjlog: arr[3].match(regexForURL)[1]
            });
            info.save(function (err) {
                if (err)
                    throw err;
            });
        }
    });
    readlineInterface.on('close', function () {
        console.log('import: ' + pathPrefix + dateStr + pathPostfix);
        if (dateStr !== endDateStr) {
            insert();
        }
        else {
            mongoose.disconnect();
        }
    });
})();
