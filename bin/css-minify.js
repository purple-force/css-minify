#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const { program } = require('commander');
const resolveFile = require('../lib/resolveFile.js');

const version = require('../package.json').version;
program
  .version(version)
  .option('-f, --file <file>', 'specify a css source file')
  .option('-d, --dir <dir>', 'specify a css source directory')
  .option('-o, --output <output>', 'specify a minified css output directory')

program.parse(process.argv);

const options = program.opts();
const { file, dir, output } = options;
if (file) {
  resolveFile(path.join(process.cwd(), file), output);
  return;
}
if (dir) {
  fs.readdir(path.join(process.cwd(), dir), function (err, filenames) {
    if (err) {
      console.log(err);
      throw new Error('读取目录' + path.join(process.cwd(), dir) + '失败');
    }
    filenames.forEach(function (filename) {
      if (filename.endsWith('.css') && !filename.endsWith('.min.css')) {
        resolveFile(path.join(process.cwd(), dir, filename), output);
      }
    });
  });
  return;
}
