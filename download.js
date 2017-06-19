const http = require('http');
const fs = require('fs');

exports.download = function(url, path) {
    const outfile = fs.createWriteStream(path);
    
    http.get(url, function(res){
        res.pipe(outfile);
        res.on('end', function () {
            outfile.close();
            console.log("download: " + url);
        });
    });
};