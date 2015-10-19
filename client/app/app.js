angular.module( 'tweetyFive', [ 'btford.socket-io' ] )

.factory( 'Socket', [ 'socketFactory', function( socketFactory ) {
  return socketFactory();
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