const urlPrefix = "http://e.mjv.jp/0/log/archived.cgi?";
const id = "2014060122gm-00b9-0000-81b92751";
const filePostfix = ".mjlog";

const http = require('http');
const fs = require('fs');
 
const outfile = fs.createWriteStream("./mjlog/" + id + filePostfix);
 
http.get(urlPrefix + id, function(res){
  res.pipe(outfile);
  res.on('end', function () {
    outfile.close();
    console.log("ok");
  });
});