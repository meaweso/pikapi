var fs = require("fs");

function read(src, callback) {
	fs.readFile(src, function(err, data) {
		if (err) {
			return console.error(err);
		}
		console.log("loading file: " + src);
		callback(data.toString());
	});
}

function write(src, content) {
	fs.writeFile(src, content, function(err) {
		if (err) {
			return console.error(err);
		}
		console.log("writed file：" + src + " content: " + content);
	});
}

function append(src, content) {
	fs.appendFile(src, content, function(err) {
		if (err) {
			return console.error(err);
		}
		console.log("writed file：" + src + " content: " + content);
	});
}

exports.read = read;
exports.write = write;
exports.append = append;