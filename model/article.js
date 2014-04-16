//MP.Article = {};

Articles = new Meteor.Collection("articles", {
  transform: function(doc) { return new Article(doc); }
});

Article = function(doc) {
  _.extend(this, doc);
};

Articles.timestampable();

_.extend(Article.prototype, {
  getAuthor: function(){
    return Meteor.users.findOne(this.author);
  },
  getUrl: function(){
    var a = this.getAuthor();
    return "/"+a.profile.username +"/"+this.url;
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
    var url = "https://gist.github.com/[author]/[gist]/raw/[filename]"
      .replace("[author]", a.profile.username)
      .replace("[gist]", this.gist)
      .replace("[filename]", this.getFilename());
    //https://gist.githubusercontent.com/Sewdn/10616795/raw/0faf346acb4e85f51c569f053b9908d5f2a43268/gistfile1.md
    var r = HTTP.get("https://api.github.com/gists/"+this.gist, function(err, res){
      if(err){
        callback(err);
      } else {
        if(res && res.data && res.data.files && res.data.files[self.getFilename()]){
          callback(undefined, res.data.files[self.getFilename()].content);
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

  }
});

//PB.constructSelector('Article', Article.prototype, Articles);
if(Meteor.isServer){
  Meteor.publish('article', function (id) {
    return Articles.find(id);
  });
  Meteor.publish('articleByUrl', function (url) {
    var a = Articles.findOne({url: url});
    return [
      Articles.find({url: url}),
      Meteor.users.find(a.author, {fields: {'profile':1}})
    ];
  });
  Meteor.publish('publishedArticles', function () {
    return Articles.find({published: true});
  });
  Meteor.publish('publishedAuthorArticles', function (userId) {
    return Articles.find({published: true, author: userId});
  });
}