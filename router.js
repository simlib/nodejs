/**
 * 路由器
 * @author: esinger <http://weibo.com/esinger>
 * @date: 14-1-13
 * @link: http://simphp.com
 */

var url = require('url');

/**
 * 路由地址解析
 * @param req
 */
exports.parse = function (req) {
    var method = req.method;
    var requrl = url.parse(req.url);
    var pathname = requrl.pathname;
    var query = requrl.query;
    console.log('[%s]Request method: %s', __filename, method);
    console.log('[%s]Request pathname: %s', __filename, pathname);
    console.log('[%s]Request query: %s', __filename, query);
};