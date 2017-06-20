const download = require('./download');
const {DateHourStrIterator} = require('./date-utils');

const startDateHourStr = '2017061323';
const endDateHourStr   = '2017061402';

const d = new DateHourStrIterator(startDateHourStr);
const urlPrefix   = 'http://tenhou.net/sc/raw/dat/scc';
const urlPostfix  = '.html.gz';
const pathPrefix  = './html/scc';
const pathPostfix = '.html';

setTimeout(function repeat() {
    const str = d.nextStr();

    download.download(urlPrefix + str + urlPostfix,
                        pathPrefix + str + pathPostfix);

    if (str === endDateHourStr) return;
    setTimeout(repeat, 2000);
}, 2000);