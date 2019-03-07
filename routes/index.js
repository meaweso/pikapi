var express = require('express');
var router = express.Router();
var path = require('path')


router.get('',function (req,res,next) {
	next();
})

/* 首页 */
router.get('/', function(req, res, next) {
	res.sendFile(path.resolve(__dirname,'../views/index.html'));
});


/* LoveRecord */
router.get('/love-record', function(req, res, next) {
	res.sendFile(path.resolve(__dirname,'../views/love-record/index.html'));
});


/* 管理员页面 */
router.get('/admin', function(req, res, next) {
	res.sendFile(path.resolve(__dirname,'../views/admin/login.html'));
});

module.exports = router;
