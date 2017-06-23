import * as fs from 'fs';
import * as zlib from 'zlib';
import {DateStrIterator} from './date-utils';

const request: Function = require('request');

const startDateStr: string = process.argv[2];
const endDateStr: string   = process.argv[3];

const d: DateStrIterator = new DateStrIterator(startDateStr);
const urlPrefix: string   = 'http://tenhou.net/sc/raw/dat/2017/scc';
const urlPostfix: string  = '.html.gz';
const pathPrefix: string  = './html/scc';
const pathPostfix: string = '.html';

setTimeout(function repeat() {
    const str: string = d.nextStr();

    const gunzip = zlib.createGunzip();
    const outfile = fs.createWriteStream(pathPrefix + str + pathPostfix);

    request(urlPrefix + str + urlPostfix).pipe(gunzip).pipe(outfile);
    console.log('download: ' + urlPrefix + str + urlPostfix);

    if (str === endDateStr) return;
    setTimeout(repeat, 2000);
}, 2000);