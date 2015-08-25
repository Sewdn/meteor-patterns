Template.socialShare.helpers({
  'url': function(){
    if(this && this.shareText)
      return "https://twitter.com/intent/tweet?text=" + this.shareText() + "&url="+this.getShortUrl();
  }
});