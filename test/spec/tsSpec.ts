/// <reference path="jasmine.d.ts"/>

describe('Test Typescript', function (){

  function helloWorld(name:string):string{
    return "Hello " + name;
  }

  it('Hello', function (){
    expect(helloWorld('toto')).toBe('Hello toto');
  });
});
