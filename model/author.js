if(Meteor.isServer){
  Meteor.publish('authorByUsername', function (userName) {
    return Meteor.users.find({'profile.username': userName});
  });
  Meteor.publish('authors', function () {
    return Meteor.users.find({'profile.author': true});
  });
}