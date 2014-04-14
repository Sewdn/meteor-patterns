Template.author.helpers({
  'published': function(){
    return Articles.find({published: true, author: this._id});
  }
});