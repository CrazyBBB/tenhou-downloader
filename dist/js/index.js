"use strict";
exports.__esModule = true;
var fs = require("fs");
var zlib = require("zlib");
var stream_1 = require("stream");
var model_1 = require("./model");
var request = require('request');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/tenhou');
var heroName = 'CrazyZZZ';
var heroNameRegex = new RegExp(heroName);
var playerRegex = /n\d="[^"]+"/g;
var positionRegex = /n(\d)="([^"]+)"/;
var urlPrefix = "http://tenhou.net/0/log/?";
var filePostfix1 = '&tw=';
var filePostfix2 = '.mjlog';
model_1.Info.find({ tenhou_ids: heroNameRegex }, function (err, infos) {
    download(infos, 0);
});
var download = function (infos, idx) {
    request(urlPrefix + infos[idx].mjlog, function (err, res, data) {
        var position;
        data.match(playerRegex).forEach(function (xml) {
            var positionMatch = xml.match(positionRegex);
            if (positionMatch) {
                if (heroName === decodeURI(positionMatch[2])) {
                    position = positionMatch[1];
                }
            }
        });
        if (position) {
            var gzip = zlib.createGzip();
            var path = "./mjlog/" + infos[idx].mjlog + filePostfix1 + position + filePostfix2;
            var outfile = fs.createWriteStream(path);
            var stream = new stream_1.Readable();
            stream.push(data);
            stream.push(null);
            stream.pipe(gzip).pipe(outfile);
            console.log('download: ' + path);
        }
    });
    if (idx === infos.length - 1) {
        mongoose.disconnect();
    }
    else {
        setTimeout(function () {
            download(infos, idx + 1);
        }, 2000);
    }
};
