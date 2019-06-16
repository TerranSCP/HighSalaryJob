const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware= require('webpack-hot-middleware');
const config = require('../../webpack.dev.config');
import {__DBUSERNAME,__DBPASSWORD} from './constConnection';



const server = express();
const __DIST_DIR = __dirname;
const __HTML = path.join(__DIST_DIR,'index.html')
const compiler = webpack(config);


const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${__DBUSERNAME}:${__DBPASSWORD}@highsalary1-k3qzy.mongodb.net/test?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    const collection = client.db("HighSalary1").collection("sample_training");
    collection.find({name:"Omnidrive"}).toArray();
        client.close();
});


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

server.get('./fakejson/',(rq,rs)=>{
    rs.sendFile('./fakejson/data.json')
})

const __PORT = process.env.port || 8080 ;

server.listen(__PORT,()=>console.log(`Server is running on port: ${__PORT}`));