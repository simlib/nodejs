/**
 * MIME类型
 * @author: esinger <http://weibo.com/esinger>
 * @date: 14-1-13
 * @link: http://simphp.com
 */

// 常用MIME类型
var types = {
    "css": "text/css",
    "gif": "image/gif",
    "html": "text/html",
    "htm": "text/html",
    "ico": "image/x-icon",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "js": "text/javascript",
    "json": "application/json",
    "pdf": "application/pdf",
    "png": "image/png",
    "svg": "image/svg+xml",
    "swf": "application/x-shockwave-flash",
    "tiff": "image/tiff",
    "txt": "text/plain",
    "wav": "audio/x-wav",
    "wma": "audio/x-ms-wma",
    "wmv": "video/x-ms-wmv",
    "xml": "text/xml"
};

// 返回所有MIME类型
exports.all = types;

/**
 * 添加MIME类型
 * @param name
 * @param value
 */
exports.add = function(name,value){
    types[name] = value;
};

/**
 * 获取MIME类型的值
 * @param name
 */
exports.get = function(name){
    return types[name] || 'text/plain';
};