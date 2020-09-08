const cluster = require('cluster');
const os = require('os')
cluster.on('listening', (worker, address) => {
  console.log(
    `进程${worker.process.pid}已连接`);
});
cluster.on('message',function(msg,handle){
  if(msg.act=='suicide'){
    return cluster.fork()
  }
})
cluster.setupMaster({
  exec:__dirname+'/worker.js'
})
var cpus = os.cpus();
for(var i=0;i<cpus.length;i++){
  cluster.fork()
}