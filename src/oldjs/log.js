const request = require('request');
const fs = require('fs');
const zlib = require('zlib');

const {DateStrIterator} = require('./date-utils');

const startDateStr = process.argv[2];
const endDateStr   = process.argv[3];

const d = new DateStrIterator(startDateStr);
const urlPrefix   = 'http://tenhou.net/sc/raw/dat/2017/scc';
const urlPostfix  = '.html.gz';
const pathPrefix  = './html/scc';
const pathPostfix = '.html';

setTimeout(function repeat() {
    const str = d.nextStr();

    const gzip = zlib.createGzip();
    const outfile = fs.createWriteStream(pathPrefix + str + pathPostfix);

    request(urlPrefix + str + urlPostfix).pipe(gzip).pipe(outfile);

    if (str === endDateStr) return;
    setTimeout(repeat, 2000);
}, 2000);