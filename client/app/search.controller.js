angular.module( 'tweetyFive' )

.controller( 'SearchController', [ 'Socket', function( Socket ) {
  var vm = this;
  vm.searchError = false;

  /////// Bindable members ///////
  vm.searchUser = searchUser;

  /////// Socket events ///////
  Socket.on( 'connect', function() {
    console.log( 'Connected to socket' );
  });

  Socket.on( 'search results', function( data ) {
    vm.searchError = false;
    vm.results = data;
  });

  Socket.on( 'search error', function( data ) {
    vm.searchError = true;
    vm.error = data;
  });

  /////// Function declarations ///////
  function searchUser( name ) {
    Socket.emit( 'search user', name );
    vm.screenName = '';
  };

}]);