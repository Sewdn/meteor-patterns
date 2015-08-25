Package.describe({
  name: 'mp:app',
  version: '0.0.1',
  summary: 'Meteorpatterns umbrella package',
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');

  api.imply([
    'mp:core',
    'mp:app-ui',
    'mp:app-posts'
  ], ['client', 'server']);

});