const http = require('http');
const fs = require('fs');
const zlib = require('zlib');

exports.download = function(url, path) {
    const gunzip = zlib.createGunzip();
    const outfile = fs.createWriteStream(path);
    
    http.get(url, function(res){
        res.pipe(gunzip).pipe(outfile);

        gunzip.on('end', function () {
            outfile.close();
            console.log("download: " + path);
        });
    });
};