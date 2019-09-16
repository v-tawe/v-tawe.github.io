'use strict'

// import fs from 'fs';
// import url from 'url';
// import path from 'path';
// import http from 'http';
var
    fs = require('fs'),
    url = require('url'),
    path = require('path'),
    http = require('http');

var root = path.resolve(process.argv[2] || './file_server');

console.log('Static root dir: ' + root);

var server = http.createServer(function(request, response) {
    var pathName = url.parse(request.url).pathname;
    var filePath = path.join(root, pathName);
    var defaultPage = ['/sample.txt', '/sample-write.txt'];
    var filePathWithDefault = false;

    fs.stat(filePath, function(err, stats) {
        if (err) {
            console.log('404' + request.url);
            response.writeHead(404);
            response.end('404 Not Found');
        } else if (stats.isFile()){
            console.log('200', request.url);
            response.writeHead(200);

            fs.createReadStream(filePath).pipe(response);
        } else if (stats.isDirectory()){
            for(let i=0; i