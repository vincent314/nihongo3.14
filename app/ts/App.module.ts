module app{
  export class Module{
    public static register = angular.module('nihongo',
      ['ngRoute', 'infinite-scroll', 'ngSanitize', 'pascalprecht.translate', 'ngResource', 'mgcrea.ngStrap.popover']);
  }
}
