Package.describe({
  summary: "segment.io NPM package"
});

Npm.depends({"analytics-node": "0.6.0"});

Package.on_use(function (api) {
  api.add_files("server.js", "server");
  api.add_files("client.js", "client");
  api.export('analytics');
});