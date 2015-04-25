var express = require('express');
var router = express.Router();
var execFile = require('child_process').execFile;
var path = require('path');
var config = require('../config.js');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Make APK' });
  //res.send(req.host);
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
      res.download(apkPath,'a.apk');
    }else{
      console.log('find zip file');
      var zipPath = path.join(__dirname, '../upload/', id + '.zip');
      fs.exists(zipPath, function(exists) {
        if(exists) {
          console.log('make apk');
          execFile('./run', [id, '11.40.277.7'], {cwd: path.join(__dirname, '..')}, function(err, stdout, stderr) {
            if(err) {
              console.log('err: \n', err);
              console.log('stdout: \n', stdout);
              console.log('stderr: \n', stderr);
              next(err);
            }else if(stderr){
              console.log('stderr');
              console.log(stdout + stderr);
              res.render('failure', {title: 'failure', information: stderr});
            }else {
              console.log('suceess');
              console.log(stdout + stderr);
              res.render('success', {title: 'success', information: stdout});
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
