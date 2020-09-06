const http = require('http')
var worker
const server = http.createServer((req,res)=>{
  res.writeHead(200,{
    'Content-Type':'text/plain'
  })
  res.end('handle by child pid is '+process.pid+'\n')
})
process.on('message',function(m,tcp){
  if(m==='server'){
    worker = tcp;
    worker.on('connection',function(socket){
      server.emit('connection',socket)
    })
    
  }
})
process.on('uncaughtException',function(){
  process.send({action:'suicide'})
  worker.close(function(){
    process.exit(1)
  })
  setTimeout(() => {
    process.exit(1)
  }, 5000);
})