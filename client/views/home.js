Template.homeArticles.helpers({
  'published': function(){
    return Articles.find({published: true});
  }
});