Template.article.onCreated(function(){
  this.subscribe('articleByUrl', FlowRouter.getParam('url'));
});

Template.article.onRendered(function(){
  $('pre code').each(function(i, e) {
    hljs.highlightBlock(e);
  });
});

Template.article.helpers({
  'article': function() {
    return Articles.findOne({url: FlowRouter.getParam('url')});
  },
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