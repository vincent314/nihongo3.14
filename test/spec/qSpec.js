'use strict';

describe('q tests', function () {

  var $q,$rootScope;

  beforeEach(inject(['$q','$rootScope', function (_$q_,_$rootScope_) {
    $q = _$q_;
    $rootScope = _$rootScope_;
  }]));


  it('q tests', function () {
    var deferred = $q.defer();
    var result;

    runs(function () {
      deferred.resolve('Hello');
      var promise = deferred.promise;
      promise.then(function (hello) {
        return  hello + ' World';
      }).then(function(sentence){
        result = 'Sentence : ' + sentence;
      });
      $rootScope.$apply();
    });

    waitsFor(function () {
      return result;
    },'result should be set',750);

    runs(function() {
      expect(result).toBe('Sentence : Hello World');
    });
  });
});
