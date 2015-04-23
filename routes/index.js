var express = require('express');
var router = express.Router();
var child_process = require('child_process');
var path = require('path');
var execFileOptionUpload = {
  cwd: path.join(__dirname, '../upload/')
};
var execFileOptionMakeApk = {
  cwd: path.join(__dirname, '../public/apk/')
}
var xwalkPath = '/home/spacelan/crosswalk-11.40.277.7/make_apk.py';
var xwalkArch = '--arch=arm';
var xwalkPackage = '--package=org.spacelan';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Make APK' });
});

router.post('/', function(req, res, next) {
  var filePath = path.join(__dirname, '..', req.files.file.path);
  var directory = req.files.file.name.split('.')[0];
  var info = '';
  child_process.execFile('mkdir', [directory], execFileOptionUpload, function(err, stdout, stderr) {
    if(err) {
      console.log(err);
      next(err);
    }else {
      info = (stdout + stderr);
      child_process.execFile('unzip', [filePath, '-d', directory], execFileOptionUpload, function(err, stdout, stderr) {
        if(err) {
          console.log(err);
          next(err);
        }else {
          info = (stdout + stderr);
          var manifestPath = path.join(__dirname, '../upload', directory, 'manifest.json');
          console.log(manifestPath);
          child_process.execFile('python', [xwalkPath, xwalkArch, xwalkPackage, '--manifest=' + manifestPath], execFileOptionUpload, function(err, stdout, stderr) {
            if(err) {
              console.log(err);
              next(err);
            }else {
              info += (stdout + stderr);
              res.render('information', {title: 'success', information: info});
            }
          });
        }
      });
    }
  });
});

module.exports = router;
