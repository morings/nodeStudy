const {pathRegexp} = require("./util.js")
const routes = {};
routes.all = [];
routes.get = [];
routes.post = [];
routes.put = [];
routes.delete = [];
//绑定中间件
function use(path){
  let handle;
  if(typeof path == 'string'){
    handle = ({
      path:pathRegexp(path),
      stack:Array.prototype.slice.call(arguments,1)
    })
  }else{
    handle = ({
      path:pathRegexp("/"),
      stack:Array.prototype.slice.call(arguments,0)
    })
  }
  routes.all.push(handle)
}
function Get(path){
  let handle = ({
    path:pathRegexp(path),
    stack:Array.prototype.slice.call(arguments,1)
  });
  routes.get.push(handle)
}
function Post(path){
  let handle = ({
    path:pathRegexp(path),
    stack:Array.prototype.slice.call(arguments,1)
  });
  routes.post.push(handle)
}
function Put(path){
  let handle = ({
    path:pathRegexp(path),
    stack:Array.prototype.slice.call(arguments,1)
  });
  routes.put.push(handle)
}
function Delete(path){
  let handle = ({
    path:pathRegexp(path),
    stack:Array.prototype.slice.call(arguments,1)
  });
  routes.delete.push(handle)
}
//获取路由
function getRoutes(){
  return routes
}
//匹配路由
function match(path){
  let statck = [];
  let handles = routes.all;
  for(let i=0;i<handles.length;i++){
    let ismatch = handles[i].path.exec(path);
    if(ismatch){
      statck.concat(handles[i].stack)
    }
  }
  return statck;
}
//中间件处理
function handle(req,res,stack){
  var next = function(){
    var middleware = stack.shift();
    if(middleware){
      middleware(req,res,next)
    }
  }
  next()
}
//404处理
function handle404(req,res){
  res.end('404')
}
module.exports = {
  use,
  getRoutes,
  match,
  handle,
  Get,
  Post,
  Put,
  Delete,
  handle404
}