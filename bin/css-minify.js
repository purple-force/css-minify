#!/usr/bin/env node
var path=require("path"),
	fs=require("fs"),
	minify=require("../lib/minify.js");
var argv=require("yargs")
		.alias("v","version")
		.alias("f","file")
		.argv;
var version=require("../package.json").version;
if(argv.v){
	console.log("css-minify "+version);
	return;
}
var source=argv.f;
if(typeof source==="string"){
	var	filename=path.basename(source,".css"),
		dest=path.dirname(source)+path.sep+filename+".min.css";
	if(!path.isAbsolute(source)){
		source=path.resolve(process.cwd(),source);
	}
	if(!path.isAbsolute(dest)){
		dest=path.resolve(process.cwd(),dest);
	}
	fs.readFile(source,"utf8",function(err,data){
		if(err){
			throw new Error(source+" 读取失败!")
		}
		data=minify(data);
		fs.writeFile(dest,data,function(err){
			if(err){
				throw new Error(dest+" 生成失败!")
			}
			console.log(dest+" 生成成功!")
		})
	})
}
