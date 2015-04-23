var path = require('path');

module.exports = {
  crosswalk: [
    {
      version: '11.40.277.7',
      path: path.join(__dirname, '/crosswalk/11.40.277.7/'),
      make_apk_path: path.join(__dirname, '/crosswalk/11.40.277.7/make_apk.py'),
      arch: ['arm', 'x86']
    },
    {
      version: '12.41.296.4',
      path: path.join(__dirname, '/corsswalk/12.41.296.4/'),
      make_apk_path: path.join(__dirname, '/crosswalk/12.41.296.4/make_apk.py'),
      arch: ['arm', 'x86']
    }
  ],
  uploadPath: path.join(__dirname, '/upload/'),
  apkPath: path.join(__dirname, '/public/apk/')
};
