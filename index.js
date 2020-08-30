
const http = require('http')
const formidable = require('formidable');
const path = require('path')
http.createServer((req,res)=>{
  handleFile(req,res,(req,res)=>{
    console.log(req.body,'\n',req.files);
    res.end("请求成功")
  })
}).listen(3000)
function hasBody (req) {
  return 'transfer-encoding' in req.headers || 'content-length' in req.headers;
};
function handleData (req, res,handle) {
  if (hasBody(req)) {
    var buffers = [];
    req.on('data', function (chunk) {
      buffers.push(chunk);
    });
    req.on('end', function () {
      req.rawBody = Buffer.concat(buffers).toString();
      handle(req, res);
    });
  } else {
    handle(req, res);
  }
}
function handleFile(req, res,handle) {
  if (hasBody(req)) {
    if (mime(req) === 'multipart/form-data') {
      var form = new formidable.IncomingForm();
      var targetFile = path.join(__dirname,'./upload');
      form.uploadDir = targetFile;
      form.parse(req, function(err, fields, files) {
      req.body = fields;
      req.files = files;
      handle(req, res);
      });
    }
  } else {
    handle(req, res);
  }
}
function mime(req) {
  var str = req.headers['content-type'] || '';
  return str.split('; ')[0];
};