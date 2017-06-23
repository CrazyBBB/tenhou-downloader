"use strict";
exports.__esModule = true;
var fs = require("fs");
var zlib = require("zlib");
var date_utils_1 = require("./date-utils");
var request = require('request');
var startDateStr = process.argv[2];
var endDateStr = process.argv[3];
var d = new date_utils_1.DateStrIterator(startDateStr);
var urlPrefix = 'http://tenhou.net/sc/raw/dat/2017/scc';
var urlPostfix = '.html.gz';
var pathPrefix = './html/scc';
var pathPostfix = '.html';
setTimeout(function repeat() {
    var str = d.nextStr();
    var gunzip = zlib.createGunzip();
    var outfile = fs.createWriteStream(pathPrefix + str + pathPostfix);
    request(urlPrefix + str + urlPostfix).pipe(gunzip).pipe(outfile);
    console.log('download: ' + urlPrefix + str + urlPostfix);
    if (str === endDateStr)
        return;
    setTimeout(repeat, 2000);
}, 2000);
