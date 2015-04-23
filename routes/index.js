var express = require('express');
var router = express.Router();
var execFile = require('child_process').execFile;
var path = require('path');
var config = require('../config.js');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Make APK' });
});


router.post('/', function(req, res, next) {
  var id = req.files.file.name.split('.')[0];
  res.render('wait', {title: 'wait', id: id});
});

router.get('/apk/:id', function(req, res, next) {
  var id = req.params.id;
  var apkPath = path.join(__dirname, '../public/apk', id + '.apk');
  var info = '';
  console.log('apk path: ' + apkPath);
  fs.exists(apkPath, function(exists) {
    if(exists) {
      res.download(filePath,'a.apk');
    }else{
      console.log('find zip file');
      var zipPath = path.join(__dirname, '../upload/', id + '.zip');
      fs.exists(zipPath, function(exists) {
        if(exists) {
          console.log('make apk');
          execFile('./run', [id, '11.40.277.7'], {cwd: path.join(__dirname, '..')}, function(err, stdout, stderr) {
            if(err) {
              console.log(err);
              next(err);
            }else {
              console.log('download');
              info += (stdout + stderr);
              console.log(info);
              res.render('information', {title: 'success', information: info});
              //res.download(apkPath);
            }
          });
        }else {
          res.redirect('/');
        }
      });
    }
  });
});

module.exports = router;
