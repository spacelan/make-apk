var express = require('express');
var router = express.Router();
var execFile = require('child_process').execFile;
var path = require('path');
var config = require('../config.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Make APK' });
});


router.post('/', function(req, res, next) {
  var filePath = path.join(__dirname, '..', req.files.file.path);
  var fileName = req.files.file.name.split('.')[0];
  var fileOriginalName = req.files.file.originalname;
  var info = '';

  execFile('mkdir', [fileName], {cwd: config.uploadPath}, function(err, stdout, stderr) {
    if(err) {
      console.log(err);
      next(err);
    }else {
      info += (stdout + stderr);
      //console.log(info);
      execFile('unzip', [filePath, '-d', fileName], {cwd: config.uploadPath}, function(err, stdout, stderr) {
        if(err) {
          console.log(err);
          next(err);
        }else {
          info += (stdout + stderr);
          console.log(info);
          var manifestPath = path.join(config.uploadPath, fileName, 'manifest.json');
          console.log(manifestPath);
          res.download(manifestPath, 'manifest.json');
          /*res.render('information', {title: 'success', information: info});
          execFile('python', [config.crosswalk[0].make_apk_path, config.crosswalk[0].arch[0], '--package=org.spacelan', '--manifest=' + manifestPath], {cwd: config.apkPath}, function(err, stdout, stderr) {
            if(err) {
              console.log(err);
              next(err);
            }else {
              info += (stdout + stderr);
              res.render('information', {title: 'success', information: info});
            }
          });*/
        }
      });
    }
  });
});

module.exports = router;
