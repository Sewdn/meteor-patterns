Template.article.created = function(){
  Session.set('articleContent', 'loading...');
};
Template.article.rendered = function(){
  $('pre code').each(function(i, e) {
    hljs.highlightBlock(e);
  });
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
        Session.set('articleContent', content);
        $('pre code').each(function(i, e) {
          hljs.highlightBlock(e);
        });
      }
    });
    return Session.get('articleContent');
  }
});

Template.article.events({

});