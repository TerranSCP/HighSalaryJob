import path from 'path';
import express from 'express';
import {__DBUSERNAME,__DBPASSWORD} from './constConnection';

const server = express();
const __DIST_DIR = __dirname;
const __HTML = path.join(__DIST_DIR,'index.html');


const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${__DBUSERNAME}:${__DBPASSWORD}@highsalary1-k3qzy.mongodb.net/test?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("HighSalary1").collection("sample_training");
    collection.find({name:"Omnidrive"}).toArray();
        client.close();
});


server.use(express.static(__DIST_DIR));

server.get('*',(rq,rs)=>{
    rs.sendFile(__HTML);
});

server.get('./fakejson/',(rq,rs)=>{
    rs.sendFile('./fakejson/data.json')
})

const __PORT = process.env.port || 8080 ;
server.listen(__PORT,()=>console.log(`Server is running on port: ${port}`))