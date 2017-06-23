import * as fs from 'fs';
import * as zlib from 'zlib';

import {Readable} from 'stream';
import {Info} from './model';

const request = require('request');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/tenhou');

const heroName = 'CrazyZZZ';
const heroNameRegex = new RegExp(heroName);

const playerRegex = /n\d="[^"]+"/g;
const positionRegex = /n(\d)="([^"]+)"/;

const urlPrefix = "http://tenhou.net/0/log/?";
const filePostfix1 = '&tw='
const filePostfix2 = '.mjlog';

Info.find({tenhou_ids: heroNameRegex}, function(err: any, infos: any) {
  download(infos, 0);
});

const download = function(infos: any, idx: number) {
  request(urlPrefix + infos[idx].mjlog, function(err: any, res: any, data: any) {
    let position;
    data.match(playerRegex).forEach(function(xml: string) {
      const positionMatch = xml.match(positionRegex);
      if (positionMatch) {
        if (heroName === decodeURI(positionMatch[2])) {
            position = positionMatch[1];
        }
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
