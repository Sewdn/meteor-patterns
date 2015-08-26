//MP.Article = {};

Articles = new Meteor.Collection("articles", {
  transform: function(doc) { return new Article(doc); }
});

Article = function(doc) {
  _.extend(this, doc);
};

//Articles.timestampable();

_.extend(Article.prototype, {
  getAuthor: function(){
    return Meteor.users.findOne(this.author);
  },
  getUrl: function(){
    var a = this.getAuthor();
    if(a){
      return "/"+a.profile.username +"/"+this.url;
    }
  },
  getShortUrl: function(){
    if(this.url && !this.shortUrl){
      //Meteor.call('shortenArticleUrl', this._id);
    }
    return this.shortUrl;
  },
  gistUrl: function(){
    var a = this.getAuthor();
    if(!!a)
      return "https://gist.github.com/[author]/[gist]"
        .replace("[author]", a.profile.username)
        .replace("[gist]", this.gist);
  },
  authorUrl: function(){
    var a = this.getAuthor();
    if(!!a)
      return '/'+a.profile.username;
  },
  getFilename: function(){
    return this.filename ? this.filename : this.url + '.md';
  },
  getContent: function(callback) {
    var a = this.getAuthor();
    if(!a)
      return;
    var self = this;
    var url;
    if(Meteor.isServer){
      url = "https://gist.github.com/[author]/[gist]/raw/[filename]"
        .replace("[author]", a.profile.username)
        .replace("[gist]", this.gist)
        .replace("[filename]", this.getFilename());
    } else {
      url = "https://api.github.com/gists/"+this.gist;
    }
    var r = HTTP.get(url, function(err, res){

      if(err){
        callback(err);
      } else {
        if(Meteor.isServer) {
          callback(null, res.content);
        } else {
          if(res && res.data && res.data.files && res.data.files[self.getFilename()]){
            callback(undefined, res.data.files[self.getFilename()].content);
          }
        }
      }

    });
    // $.ajax({
    //   url: 'https://api.github.com/gists/'+gistid,
    //   type: 'GET',
    //   dataType: 'jsonp'
    // }).success( function(gistdata) {
    //     var content = gistdata.data.files[filename].content;
    //     DoSomethingWith(content)
    //   }).error( function(e) {
    //   // ajax error
    // });

  },
  shareText: function(){
    return "interesting @meteorjs pattern: " + this.title + " - " + this.tldr;
  }
});

//PB.constructSelector('Article', Article.prototype, Articles);
if(Meteor.isServer){
  Meteor.methods({
    'shortenArticleUrl': function(articleId){
      var article = Articles.findOne(articleId);
      if(article){
        var Future = Npm.require('fibers/future'),
          fut = new Future(),
          Fiber = Npm.require('fibers');
        Fiber(function() {
          var u = Meteor.absoluteUrl(article.getUrl().substring(1));
          bitly.shorten(u, Meteor.bindEnvironment(function(err, response) {
            if (err)
              throw err;
            if(!response.data || !response.data.url)
              return fut.return();
            Articles.update(articleId, {$set:{shortUrl: response.data.url}});
            return fut.return(response.data.url);
          }));
        }).run();
        return fut.wait();
      }
    }
  });
}