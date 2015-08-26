var seoPicker = Picker.filter(function(req, res) {
  //also return this for facebook
  if(/_escaped_fragment_/.test(req.url))
    return true;
  if(req.headers['user-agent'] && req.headers['user-agent'].indexOf('facebookexternalhit') > -1)
    return true;

  return false;
});

var staticPicker = Picker.filter(function(req, res) {
  return true;
});

seoPicker.route('/:author/:url', function(params, req, res, next) {
  var post = Articles.findOne({url: params.url});
  post.getContent(function(err, data) {
    if(data) {
      var marked = Npm.require('marked');
      SSR.compileTemplate('layout', Assets.getText('layout.html'));
      res.end(SSR.render('layout', _.extend({}, post, {content: marked(data)})));
    }
  });
});