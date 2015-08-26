Package.describe({
  name: 'mp:core',
  version: '0.0.1',
  summary: 'Meteorpatterns core',
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');

  api.use([
    'http',
    'underscore'
  ], ['client', 'server']);

  api.use([
    'templating',
    'kadira:flow-router',
    'kadira:blaze-layout',
    'percolatestudio:segment.io'
  ], ['client']);

  api.addFiles([
    'model/article.js'
  ], ['client', 'server']);

  api.addFiles([
    'router.js'
  ], 'client');

  api.export('Articles');

});