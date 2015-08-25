Meteor.startup(function() {
  Meteor.subscribe('publishedArticles');
  Meteor.subscribe('authors');
});
