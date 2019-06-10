import path from 'path';
import express from 'express';

const server = express(),
__DIST_DIR = __dirname;
__HTML = path.resolve(__DIST_DIR,'index.html')


server.use(express.static(__DIST_DIR));

server.get('*',(rq,rs)=>{
    rs.sendFile(__HTML);
});

const __PORT = process.env.port || 8080 ;
server.listen(port,()=>console.log(`Server is running on port: ${port}`))