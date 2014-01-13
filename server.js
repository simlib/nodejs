/**
 * 服务器
 * @author: esinger <http://weibo.com/esinger>
 * @date: 14-1-13
 * @link: http://simphp.com
 */

var http = require('http');
var router = require('./router');

exports.start = function () {
    http.createServer(function (req, res) {
        router.parse(req);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<h2>Hello SimNode!</h2>');
        res.end();
    }).listen(2425, '127.0.0.1');
    console.log('[%s]Server running at %s:%s', __filename, '127.0.0.1', '2425');
}