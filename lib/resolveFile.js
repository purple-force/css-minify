const minify = require('./minify.js');
const fs = require('fs');
const path = require('path');
const dirExistsSync = require('../lib/dirExistsSync.js');

const resolveFile = function (source, output) {
  if (!output) output = 'css-dist';
  const dirpath = path.join(process.cwd(), output);
  if (!dirExistsSync(dirpath)) {
    fs.mkdirSync(dirpath);
  }
  const filename = path.basename(source, '.css');
  const dest = path.join(process.cwd(), output, filename + '.min.css');
  if (!path.isAbsolute(source)) {
    source = path.resolve(process.cwd(), source);
  }
  fs.readFile(source, 'utf8', async function (err, data) {
    if (err) {
      console.log(err);
      throw new Error(source + ' 读取失败!');
    }
    data = await minify(data);
    fs.writeFile(dest, data, function (err) {
      if (err) {
        console.log(err);
        throw new Error(dest + ' 生成失败!');
      }
      console.log(dest + ' 生成成功!');
    });
  });
};
module.exports = resolveFile;
