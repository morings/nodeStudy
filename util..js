var pathRegexp = function (path) {
  var reg = path
  if (typeof reg == "string") {
    reg = reg.replace(/[\[\]\\\^\:\.\?\+]/g, function (m) {
      return "\\" + m;
    })
    reg = reg.replace(/\*\*|\*/g, function (m) {
      if (m == "**") {
        return "[\\w\\W]*";
      } else {
        return "[^\\\/]*";
      }

    })
    reg = new RegExp(reg, "gi")
  }
  return reg
}
module.exports = {
  pathRegexp
}