angular.module( 'tweetyFive' )

.directive( 'searchTwitterUsers', [ function( ) {
  
  function SearchController(Socket) {
    var vm = this;
    vm.searchError = false;
    vm.beforeSearch = true;

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

    // /////// Function declarations ///////
    function searchUser( name ) {
      vm.beforeSearch = false;
      Socket.emit( 'search user', name );
      vm.screenName = '';
    } 
  }

  return {
    restrict: 'E',
    bindToController: true,
    controllerAs: 'search',
    controller: [ 'Socket', SearchController ],
    templateUrl: '../templates/search.html',
    replace: true,
    scope: {}
  };

}]);