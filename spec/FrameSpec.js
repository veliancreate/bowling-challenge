describe ('Frame', function(){

  var frame; 

  beforeEach(function() {
    frame = new Frame;
  });

  it('has 10 pins on initialization', function(){
    expect(frame.pinsRemaining).toEqual(10)    
  });

  it('logs the score for both rolls as being 0 on initialization', function(){
    expect(frame.rollOneScore).toEqual(0);
    expect(frame.rollTwoScore).toEqual(0);
  });

  it('can reduce the number of pins when it receives a roll', function(){
    frame.getRoll(1)
    expect(frame.pinsRemaining).toEqual(9)
  });

  it('knows what the score is for each roll', function(){
    frame.pinsRemaining = 10
    frame.getRoll(4)
    expect(frame.rollOneScore).toEqual(4);
    frame.getRoll(6)
    expect(frame.rollTwoScore).toEqual(6);
  });
      
});
