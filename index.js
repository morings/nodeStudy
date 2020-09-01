const http = require('http');
const app = require("./app")
http.createServer(function (req, res) {
  var pathname = url.parse(req.url).pathname;
  // 将请求方法变为小写
  var method = req.method.toLowerCase();
  // 获取all()方法里的中间件
  var stacks = app.match(pathname);
  var routes = app.getRoutes()
  if (routes.hasOwnPerperty(method)) {
    // 根据请求方法分发，获取相关的中间件
    stacks.concat(app.match(pathname, routes[method]));
  }

  if (stacks.length) {
    app.handle(req, res, stacks);
  } else {
    // 处理404请求
    app.handle404(req, res);
  }
}).listen(3000) 