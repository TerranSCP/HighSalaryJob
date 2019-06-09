const express = require('express');
const server = express();
const port = 8080;
const path = require("path");

//use public directory as static server
server.use(express.static('./public'));

server.get('/public',(rq,rs)=>{
    rs.sendFile(__dirname+'/public/index.html');
});

server.get('/public/fakejson',(rq,rs)=>{
    rs.sendFile(__dirname+'/public/fakejson/data.json');
});




server.listen(port,()=>console.log(`Server is running on port: ${port}`))