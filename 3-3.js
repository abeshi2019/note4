const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');
const qs = require('querystring');

const index_page = fs.readFileSync('./3-2.ejs', 'utf8');
const other_page = fs.readFileSync('./2-17.ejs', 'utf8');
const style_css = fs.readFileSync('./2-14.css', 'utf8');

var server = http.createServer(getFromClient);

server.listen(3000);
console.log("Server start!");

//ここまでメインプログラム

//createServerの処理
function getFromClient(request, response) {
    var url_parts = url.parse(request.url, true);
    switch (url_parts.pathname) {

        case '/':
            response_index(request, response);
            break;

        case '/2-17':
            response_other(request, response);
            break;

        case '/2-14.css':
            response.writeHead(200, { 'Content-Type': 'text/css' });
            response.write(style_css);
            response.end();
            break;

        default:
            response.writeHead(200, { 'Content-Type': 'text/plain' });
            response.end('no page...');
            break;
    }
}

//indexのアクセス処理
function response_index(request, response) {
    var msg = "これはindexページです。"
    var content = ejs.render(index_page, {
        title: "Index",
        content: msg,
    });
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(content);
    response.end();
}

//otherのアクセス処理
function response_other(request, response) {
    var msg = "これはOtherページです。"
    if (request.method == 'POST') {
        var body = '';

        //データ受信のイベント処理
        request.on('data', (data) => {
            body += data;
        });

        //データ受信終了のイベント処理
        request.on('end', () => {
            var post_data = qs.parse(body);
            msg += 'あなたは、「' + post_data.msg + '」と書きました。';
            var content = ejs.render(other_page, {
                title: "Other",
                content: msg,
            });
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(content);
            response.end();
        });

        //Getアクセス時の処理    
    } else {
        var msg = "ページがありません。";
        var content = ejs.render(other_page, {
            title: "Other",
            content: msg,
        });
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(content);
        response.end();
    }
}