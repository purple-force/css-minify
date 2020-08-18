var minify = require("./minify.js");
var fs = require("fs");
var path = require("path");
var dirExistsSync = require("../lib/dirExistsSync.js");

var resolveFile = function (source, output) {
  if (!output) output = "css-dist";
  var dirpath = path.join(process.cwd(), output);
  if (!dirExistsSync(dirpath)) {
    fs.mkdirSync(dirpath);
  }
  var filename = path.basename(source, ".css"),
    dest = path.join(process.cwd(), output, filename + ".min.css");
  if (!path.isAbsolute(source)) {
    source = path.resolve(process.cwd(), source);
  }
  fs.readFile(source, "utf8", function (err, data) {
    if (err) {
      console.log(err);
      throw new Error(source + " 读取失败!");
    }
    data = minify(data);
    fs.writeFile(dest, data, function (err) {
      if (err) {
        console.log(err);
        throw new Error(dest + " 生成失败!");
      }
      console.log(dest + " 生成成功!");
    });
  });
};
module.exports = resolveFile;
