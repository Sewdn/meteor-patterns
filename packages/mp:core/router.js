FlowRouter.route('/', {
  action: function(params) {
    BlazeLayout.render('layout', { main: 'home' });
  }
});

FlowRouter.route('/:author/:url', {
  action: function(params) {
    BlazeLayout.render('layout', { main: 'article' });
  }
});