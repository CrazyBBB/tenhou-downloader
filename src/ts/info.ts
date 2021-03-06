import * as fs from 'fs';
import * as readline from 'readline';

import {DateStrIterator} from './date-utils';
import {Info} from './model';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/tenhou');

const startDateStr: string = process.argv[2];
const endDateStr: string   = process.argv[3];

const pathPrefix: string = './html/scc'
const pathPostfix: string = '.html';
const regexForIdRate: RegExp = /(.+)\((.+)\) (.+)\((.+)\) (.+)\((.+)\)<br>/;
const regexForURL: RegExp = /log=([^"]+)/;

const iterator = new DateStrIterator(startDateStr);

(function insert() {
    const dateStr = iterator.nextStr();
    const readlineInterface = readline.createInterface({
        input: fs.createReadStream(pathPrefix + dateStr + pathPostfix),
        output: undefined
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
            const info = new Info({
                date: date,
                taku: arr[2].replace(/－/g, ''),
                tenhou_ids: JSON.stringify([match[1], match[3], match[5]]),
                scores: JSON.stringify([match[2], match[4], match[6]]),
                time: parseInt(arr[1]),
                mjlog: arr[3].match(regexForURL)[1]
            });
            info.save(function(err) {
                if (err) throw err;
            });
        }
    });

    readlineInterface.on('close', function() {
        console.log('import: ' + pathPrefix + dateStr + pathPostfix);
        if (dateStr !== endDateStr) {
            insert();
        } else {
            mongoose.disconnect();
        }
    });
})();

