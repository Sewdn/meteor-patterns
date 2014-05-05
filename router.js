Router.configure({layoutTemplate: "layout"});
Router.map(function() {
  this.route('home', {
    path: '/',
    waitOn: function() { return [
        Meteor.subscribe('authors'),
        Meteor.subscribe('publishedArticles')
      ];
    },
    fastRender: true
  });
  this.route('article', {
    path: '/:author/:url',
    waitOn: function() { return Meteor.subscribe('articleByUrl', this.params.url);},
    data: function() { return Articles.findOne({url: this.params.url}); }
  });
  this.route('author', {
    path: '/:author',
    waitOn: function() {
      var author = Meteor.users.findOne({'profile.username': this.params.author});
      return [Meteor.subscribe('authorByUsername', this.params.author), Meteor.subscribe('publishedAuthorArticles', author._id)];
    },
    data: function() { return Meteor.users.findOne({'profile.username': this.params.author}); }
  });
});
Router.onBeforeAction('loading');

if(Meteor.isServer){
  FastRender.route('/:author', function(params) {
    this.subscribe('authorByUsername', params.author);

    //assuming, PostCollection is the Meteor Collection for your blog posts
    var author = Meteor.users.findOne({'profile.username': params.author});
    this.subscribe('publishedAuthorArticles', author._id);
  });
}

if(Meteor.isClient){
  Router.configure({
    load: function () {
      console.log(this.path);
      analytics.page(this.path);
    }
  });
}