const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware= require('webpack-hot-middleware');
const config = require('../../webpack.dev.config')



const server = express(),
__DIST_DIR = __dirname;
__HTML = path.join(__DIST_DIR,'index.html')
compiler = webpack(config);  


server.use(webpackDevMiddleware(compiler,{
    publicPath:config.output.publicPath
}));

server.use(webpackHotMiddleware(compiler));

server.get('*',(rq,rs,next)=>{
    compiler.outputFileSystem.readFile(__HTML,(err,result)=>{
        if(err){
            return next(err);
        }
        rs.set('content-type','text/html');
        rs.send(result);
        rs.end();
    })
});

const __PORT = process.env.port || 8080 ;

server.listen(__PORT,()=>console.log(`Server is running on port: ${__PORT}`));