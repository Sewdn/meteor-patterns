Router.configure({layoutTemplate: "layout"});
Router.map(function() {
  this.route('home', {
    path: '/',
    waitOn: function() { return Meteor.subscribe('publishedArticles');},
    fastRender: true
  });
  this.route('article', {
    path: '/:author/:url',
    waitOn: function() { return Meteor.subscribe('articleByUrl', this.params.url);},
    data: function() { return Articles.findOne({url: this.params.url}); }
  });
});
Router.onBeforeAction('loading');