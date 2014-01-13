/**
 * 服务器
 * @author: esinger <http://weibo.com/esinger>
 * @date: 14-1-13
 * @link: http://simphp.com
 */

var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var zlib = require('zlib');
var config = require('./config');
var PORT = 8888;


var callback = function (req, res) {
    var pathname = url.parse(req.url).pathname;
    var realpath = path.join('assets', pathname);
    fs.exists(realpath, function (exists) {
        if (!exists) {
            res.writeHead(404,'Not Found', {'Content-Type': 'text/plain'});
            res.write('The request URL ' + pathname + ' was not found on this server.');
            res.end();
        } else {
            fs.stat(realpath, function (err, stats) {
                var ext = path.extname(realpath);
                ext && (ext = ext.slice(1));
                var lastModified = stats.mtime.toUTCString();
                var ifModifiedSince = 'If-Modified-Since'.toLowerCase();
                res.setHeader('Last-Modified', lastModified);

                if (ext.match(config.expires.match)) {
                    var expires = new Date();
                    expires.setTime(expires.getTime() + config.expires.maxAge * 1000);
                    res.setHeader('Expires', expires.toUTCString());
                    res.setHeader('Cache-Control', 'max-age=' + config.expires.maxAge);
                }

                if (req.headers[ifModifiedSince] && lastModified == req.headers[ifModifiedSince]) {
                    res.writeHead(304, 'Not Modified');
                    res.end();
                } else {
                    var raw = fs.createReadStream(realpath);
                    var acceptEncoding = req.headers['accept-encoding'] || '';
                    var matched = ext.match(config.compress.match);

                    if (matched && acceptEncoding.match(/\bgzip\b/)){
                        res.writeHead(200, 'Ok', {'Content-Encoding': 'gzip'});
                        raw.pipe(zlib.createGzip()).pipe(res);
                    } else if (matched && acceptEncoding.match(/\bdeflate\b/)){
                        res.pipe(zlib.createDeflate()).pipe(res);
                    } else {
                        res.writeHead(200, 'Ok');
                        raw.pipe(res);
                    }
                }
            });
        }
    });
};

exports.start = function () {
    http.createServer(callback).listen(PORT);
};