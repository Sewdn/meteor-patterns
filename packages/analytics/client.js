analytics=[];

analytics.methods=["identify","track","trackLink","trackForm","trackClick","trackSubmit","page","pageview","ab","alias","ready","group","on","once","off"];
analytics.factory=function(t){
  return function(){
    var a=Array.prototype.slice.call(arguments);
    return a.unshift(t),window.analytics.push(a),window.analytics;
  };
};
for(var i=0;analytics.methods.length>i;i++){
  var method=analytics.methods[i];
  analytics[method]=analytics.factory(method);
}
analytics.load=function(t){
  var a=document.createElement("script");
    a.type="text/javascript",
    a.async=!0,
    a.src=("https:"===document.location.protocol?"https://":"http://")+"d2dq2ahtl5zl1z.cloudfront.net/analytics.js/v1/"+t+"/analytics.min.js";
  var n=document.getElementsByTagName("script")[0];
    n.parentNode.insertBefore(a,n);
};

analytics.SNIPPET_VERSION="2.0.8";

analytics.load("4k9njeutgb");