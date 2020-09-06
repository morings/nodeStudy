
const http = require('http')

http.createServer((req,res)=>{
  res.writeHead(200,{
    'content-type':'text/html;charset=utf-8'
  });
  //res.setHeader('content-type', 'text/plain;charset=utf-8')
  res.end('<div>跳转百度</div>')
}).listen(3000)
