process.on('message',function(m){
  console.log("父进程发来消息:",m)
})
process.send({foo:'bar'})