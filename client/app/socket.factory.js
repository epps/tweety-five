angular.module( 'tweetyFive' )

.factory( 'Socket', [ 'socketFactory', function( socketFactory ) {
  return socketFactory();
}]);