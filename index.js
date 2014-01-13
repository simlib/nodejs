/**
 * 入口文件
 * @author: esinger <http://weibo.com/esinger>
 * @date: 14-1-13
 * @link: http://simphp.com
 */

//var app = require('./app');
//
//app.start();

var mime = require('./mime');
//console.log(mime.all);
console.log(mime.get('css'));
mime.add('htm', 'text/html');
console.log(mime.get('htm'));

var i = (3 == 4)
    ? 1
    : 2;