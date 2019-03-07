var express = require('express');
var bodyParser = require('body-parser');
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');
var rd = require('rd');

var urlencodedParser = bodyParser.urlencoded({
	extended: false
})
var router = express.Router();
var file = require('./file.js')
var path = require('path')

/* 登录验证，登录成功返回true */
router.post('', function(req, res) {
	var name = req.body.username;
	var password = req.body.password;

	if (name == 'zhuang' && password == '123123') {
		var user = {
			'username': 'love'
		};
		req.session.user = user;
		res.json({
			success: true
		});
	} else {
		res.json({
			success: false
		});
	}
});

/* 管理员页面 */
router.get('/index', function(req, res) {
	res.sendFile(path.resolve(__dirname, '../views/admin/index.html'));
});



/* Love Record */
/* 获取所有语句 */
router.get('/love-record/says', function(req, res) {
	file.read(path.resolve(__dirname, '../public/config/says.txt'), function(data) {
		res.json(data);
	});
})

/* 上传*/
router.post('/love-record/upload', function(req, res, next) {
	console.log('start');
	//生成multiparty对象，并配置上传目标路径
	var form = new multiparty.Form({
		uploadDir: './public/images/love-record/'
	});
	//上传完成后处理
	form.parse(req, function(err, fields, files) {
		var filesTmp = JSON.stringify(files, null, 2);

		if (err) {
			console.log('parse error: ' + err);
		} else {
			console.log('parse files: ' + filesTmp);
			var inputFile = files.inputFile[0];
			var uploadedPath = inputFile.path;

			//重名为当前最大的一个数字
			var files = rd.readSync('./public/images/love-record');
			var max = 0;
			files.map(function (str) {
				var rank = parseInt(str.split(".")[0]);
				if(!isNaN(rank)){
					max = Math.max(rank,max);
				}
			});
			var dstPath = './public/images/love-record/' + (max+1) + '.' + inputFile.originalFilename.split('.')[1];
			//重命名为真实文件名
			fs.rename(uploadedPath, dstPath, function(err) {
				if (err) {
					console.log('rename error: ' + err);
				} else {
					console.log('rename ok');
				}
			});
		}

		res.writeHead(200, {
			'content-type': 'text/plain;charset=utf-8'
		});
		res.write('received upload:\n\n');
		res.end(util.inspect({
			fields: fields,
			files: filesTmp
		}));
	});
});



module.exports = router;