Template.article.rendered = function(){

};

Template.article.helpers({
  'renderContent': function(){
    if(!this._id)
      return "";
    this.getContent(function(err, content){
      if(err){
        return Session.set('articleContent', err.response.data.message);
      }
      if(content){
        return Session.set('articleContent', content);
      }
    });
    return Session.get('articleContent');
  }
});

Template.article.events({
  "click event": function(){

  }
});