describe('Test app typescript', function () {

  beforeEach(()=>{
    module('test');
  });


  it('test constant', inject((NAME)=>{
    expect(NAME).toBe('test');
  }));
});
