const http = require('http');
const cluster = require('cluster');
const server = http.createServer((req,res)=>{
  res.writeHead(200);
  res.end(process.pid+'：Hello World')
}).listen(8000)
var worker = cluster.worker;
console.log(process.pid)
process.on('uncaughtException',function(){
  console.log(12)
})

