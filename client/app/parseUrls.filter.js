angular.module( 'tweetyFive' )

.filter( 'parseUrls', [ '$sce', function( $sce ) {
  var urls = /(\b(https?|ftp):\/\/[A-Z0-9+&@#\/%?=~_|!:,.;-]*[-A-Z0-9+&@#\/%=~_|])/gim;
  return function( str ) {
    if ( str.match( urls ) ) {
      str = str.replace( urls, '<a href="$1" target="_blank">$1</a>');
    }
    return $sce.trustAsHtml(str);
  };
}]);