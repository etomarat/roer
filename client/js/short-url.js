/* global gapi, setTimeout, window */

window.makeShortUrl = function (url, callback) {
  if (gapi.client && gapi.client.urlshortener && gapi.client.urlshortener.url) {
    var request = gapi.client.urlshortener.url.insert({
      'longUrl': url
    });
    request.then(function(response) {
      console.log(response);
      callback(response.result.id);
    }, function(reason) {
      console.log('Error: ' + reason.result.error.message);
    });
    
  } else {
    setTimeout(function (){
      window.makeShortUrl(url, callback);
    }, 300);
  }
};

function urlShortInit() {
  gapi.client.setApiKey('AIzaSyAsMKTEzpaaRULg_QDWAZpcH-HPZok-GBs');
  gapi.client.load('urlshortener', 'v1');
}
