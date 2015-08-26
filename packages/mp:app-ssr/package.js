Package.describe({
  name: 'mp:app-ssr',
  version: '0.0.1',
  summary: 'Meteorpatterns Server side rendering',
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');

  Npm.depends({
    'marked': '0.3.5'
  });

  api.use([
    'meteorhacks:picker',
    'meteorhacks:ssr@2.1.1'
  ], 'server');

  api.addFiles([
    'routing.js'
  ], 'server');

  api.addFiles([
    'layout.html'
  ], 'server', {isAssets: true});

});