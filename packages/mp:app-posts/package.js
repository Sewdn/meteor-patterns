Package.describe({
  name: 'mp:app-posts',
  version: '0.0.1',
  summary: 'Meteorpatterns posts',
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');

  api.use([
    'templating',
    'markdown',
    'kadira:flow-router',
    'kadira:blaze-layout',
    'kenlimmj:hljs'
  ], ['client']);

  api.use([
    'mp:core'
  ], ['client', 'server']);

  api.addFiles([
    'publications.js'
  ], 'server');

  api.addFiles([
    'client/client.js',
    'components/home.html',
    'components/home.js',
    'components/article/article.html',
    'components/article/article.js',
    'components/article/item.html',
    'components/article/list.html',
    'components/social.html',
    'components/social.js'
  ], ['client']);

});
