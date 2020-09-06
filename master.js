const fork = require("child_process").fork;
const cpus = require('os').cpus();
const http = require('http')
const limit = 10;
const during = 60000;
const restart = [];
const workers = {}
const server = http.createServer((req,res)=>{
  
 
})
server.listen(80)
for(var i=0;i<cpus.length;i++){
  createWorker()
}
function createWorker(){
  var worker = fork(__dirname+'/worker.js');
  worker.send('server',server);
  workers[worker.pid] = worker;
  console.log('Worker '+worker.pid+' created');
  worker.on('message',function(message){
    if(message.action === 'suicide'){
      if(isToolFrequently()){
        console.log('重启次数超出限制');
        return;
      }
      createWorker()
    }
  })
  worker.on('exit',function(){
    console.log('Worker '+worker.pid+' exited');
    delete workers[worker.pid] 
  })
}
function isToolFrequently(){
  var time = Date.now();
  var length = restart.push(time);
  if(length>limit){
    restart = restart.slice(-1*limit)
  }
  return length>limit && restart[restart.length-1]-restart[0]<during;
}
