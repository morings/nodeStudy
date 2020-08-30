const http = require('http')
const url = require('url')
const queryString = require('querystring')
http.createServer((req,res)=>{
  let requrl = req.url;
  console.log(requrl,'\n')
  let urlJson = url.parse(requrl)
  console.log(urlJson,'\n')
  let query = url.parse(requrl,true)
  console.log(query,'\n')
  console.log(queryString.parse(urlJson.query))
  res.end('helloworld')
}).listen(3000)