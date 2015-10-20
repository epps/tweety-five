angular.module( 'tweetyFive', [ 'btford.socket-io', 'ngSanitize' ] )

.factory( 'Socket', [ 'socketFactory', function( socketFactory ) {
  return socketFactory();
}])

.filter( 'parseUrls', [ '$sce', function( $sce ) {
  var urls = /(\b(https?|ftp):\/\/[A-Z0-9+&@#\/%?=~_|!:,.;-]*[-A-Z0-9+&@#\/%=~_|])/gim;
  return function( str ) {
    if ( str.match( urls ) ) {
      str = str.replace( urls, '<a href="$1" target="_blank">$1</a>');
    }
    return $sce.trustAsHtml(str);
  };
}])

.controller( 'SearchController', [ 'Socket', function( Socket ) {
  var vm = this;

  /////// Bindable members ///////
  vm.searchUser = searchUser;

  /////// Socket events ///////
  Socket.on( 'connect', function() {
    console.log( 'Connected to socket' );
  });

  Socket.on( 'search results', function( data ) {
    console.log( data );
    vm.results = data;
  });

  Socket.on( 'search error', function( data ) {
    console.log( data );
  });

  /////// Function declarations ///////
  function searchUser( name ) {
    Socket.emit( 'search user', name );
    vm.screenName = '';
  };

}]);