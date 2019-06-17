const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware= require('webpack-hot-middleware');
const config = require('../../webpack.dev.config');
import {__DBUSERNAME,__DBPASSWORD} from './constConnection';
import data from '../../public/fakejson/data.json'



const server = express();
const __DIST_DIR = __dirname;
const __HTML = path.join(__DIST_DIR,'index.html')
const compiler = webpack(config);


const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${__DBUSERNAME}:${__DBPASSWORD}@highsalary1-k3qzy.mongodb.net/test?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    if(err){
        throw new Error(err);
    }
    const collection = client.db("HighSalary1").collection("vacancy_list");
        collection.stats();
            console.log('mongo connection succeed');
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

})


const __PORT = process.env.port || 8080 ;

server.listen(__PORT,()=>console.log(`Server is running on port: ${__PORT}`));