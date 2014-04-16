if(Meteor.isServer){
  Meteor.publish('authorByUsername', function (userName) {
    return Meteor.users.find({'profile.username': userName}, {fields:{'profile':1}});
  });
  Meteor.publish('authors', function () {
    return Meteor.users.find({'profile.author': true}, {fields:{'profile':1}});
  });
}