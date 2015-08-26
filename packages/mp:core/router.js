Meteor.startup(function() {
  analytics.load(Meteor.settings.public.analytics_api_key);
});

function trackPage(context) {
  analytics.page();
};

FlowRouter.route('/', {
  triggersEnter: [trackPage],
  action: function(params) {
    BlazeLayout.render('layout', { main: 'home' });
  }
});

FlowRouter.route('/:author/:url', {
  triggersEnter: [trackPage],
  action: function(params) {
    BlazeLayout.render('layout', { main: 'article' });
  }
});