declare module nihongo {
  angular.module('test', [])
    .config(()=> {
      console.log('TEST TYPESCRIPT ANGULAR APPLICATION');
    })
    .constant('NAME', 'test');
}
