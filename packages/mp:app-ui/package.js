Package.describe({
  name: 'mp:app-ui',
  version: '0.0.1',
  summary: 'Meteorpatterns UI',
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');

  api.use([
    'templating'
  ], 'client');

  api.addFiles([
    'head.html',
    'layout.html',
    'logo.html'
  ], 'client');

});