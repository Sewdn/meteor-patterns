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
Meteor.publish('authorByUsername', function (userName) {
  return Meteor.users.find({'profile.username': userName}, {fields:{'profile':1}});
});
Meteor.publish('authors', function () {
  return Meteor.users.find({'profile.author': true}, {fields:{'profile':1}});
});