const cp = require('child_process')
const n = cp.fork(__dirname+"/sub.js")
n.on('message',function(m){
  console.log("子进程发来消息:",m)//发过来什么接受什么
})
n.send({hello:'world'})
