// Graciously copied and modified from npm/init-package-json/master/default-input.js

var name = package.name || basename;

exports.name =  yes ? name : prompt('name', name);

var version =
  package.version ||
  config.get('init.version') ||
  config.get('init-version') ||
  '1.0.0';
exports.version =
  yes
  ? version
  : prompt('version', version,
    function (version) {
      if (require('semver').valid(version)) {
        return version;
      }
      var err = new Error('Invalid version: "' + (version || '') + '"');
      err.notValid = true;
      return err;
  });

if(!package.private) {
  exports.private = true;
}

if (!package.description) {
  exports.description = yes ? '' : prompt('description');
}

if (!package.main) {
  exports.main =
    yes
    ? 'index.ck'
    : prompt('main', 'index.ck',
      function (main) {
        if(typeof main === 'string' && main.match(/\.ck$/)) {
          return main;
        }
        var err = new Error('Invalid main: "' + (main || '') + '"');
        err.notValid = true;
        return err;
      });
}

if (!package.repository) {
  exports.repository = function (cb) {
    require('fs').readFile('.git/config', 'utf8', function (er, gconf) {
      if (er || !gconf) {
        return cb(null, yes ? '' : prompt('git repository'));
      }
      gconf = gconf.split(/\r?\n/);
      var i = gconf.indexOf('[remote "origin"]');
      if (i !== -1) {
        var u = gconf[i + 1];
        if (!u.match(/^\s*url =/)) u = gconf[i + 2];
        if (!u.match(/^\s*url =/)) u = null;
        else u = u.replace(/^\s*url = /, '');
      }
      if (u && u.match(/^git@github.com:/))
        u = u.replace(/^git@github.com:/, 'https://github.com/');

      return cb(null, yes ? u : prompt('git repository', u));
    })
  }
}

if (!package.keywords) {
  exports.keywords = yes ? '' : prompt('keywords', function (s) {
    if (!s) return undefined;
    if (Array.isArray(s)) s = s.join(' ');
    if (typeof s !== 'string') return s;
    return s.split(/[\s,]+/);
  })
}

if (!package.author) {
  exports.author =
    config.get('init.author.name') ||
    config.get('init-author-name')
  ? {
      "name" : config.get('init.author.name') ||
               config.get('init-author-name'),
      "email" : config.get('init.author.email') ||
                config.get('init-author-email'),
      "url" : config.get('init.author.url') ||
              config.get('init-author-url')
    }
  : yes ? '' : prompt('author');
}

var license = package.license ||
              config.get('init.license') ||
              config.get('init-license') ||
              'MIT';
exports.license = yes ? license : prompt('license', license);
