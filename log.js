const download = require('./download');
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

    download.download(urlPrefix + str + urlPostfix,
                        pathPrefix + str + pathPostfix);

    if (str === endDateStr) return;
    setTimeout(repeat, 2000);
}, 2000);